/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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
        return this.reservationRepository.save(data);
    }

    async findAll(): Promise<Reservation[]> {
        return this.reservationRepository.find({ relations: ['user'] });
    }

    async delete(id: number): Promise<void> {
        await this.reservationRepository.delete(id);
    }
}
