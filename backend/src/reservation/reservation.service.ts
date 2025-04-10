/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reservation } from './reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(data: Partial<Reservation>): Promise<Reservation> {
    try {
      if (!data || !data.user || !data.startDate || !data.endDate || !data.reservationCode) {
        throw new BadRequestException('Missing required reservation fields');
      }

      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (endDate <= startDate) {
        throw new BadRequestException('End date must be after start date');
      }

      const twoHours = 2 * 60 * 60 * 1000;

      const overlappingReservations = await this.reservationRepository
        .createQueryBuilder('reservation')
        .where('reservation.startDate < :endPlusBuffer', { endPlusBuffer: new Date(endDate.getTime() + twoHours) })
        .andWhere('reservation.endDate > :startMinusBuffer', { startMinusBuffer: new Date(startDate.getTime() - twoHours) })
        .getMany();

      if (overlappingReservations.length > 0) {
        throw new BadRequestException('A reservation already exists within 2 hours of the selected time range.');
      }

      const newReservation = this.reservationRepository.create(data);
      return await this.reservationRepository.save(newReservation);
    } catch (error) {
      console.error('Create reservation error:', error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to create reservation');
    }
  }
  
  async findAll(): Promise<Reservation[]> {
    try {
      return await this.reservationRepository.find({ relations: ['user'] });
    } catch (error) {
      console.error('Find all reservations error:', error);
      throw new InternalServerErrorException('Failed to fetch reservations');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const reservation = await this.reservationRepository.findOne({ where: { id } });
      if (!reservation) {
        throw new NotFoundException(`Reservation with ID ${id} not found`);
      }

      await this.reservationRepository.delete(id);
    } catch (error) {
      console.error('Delete reservation error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete reservation');
    }
  }
}
