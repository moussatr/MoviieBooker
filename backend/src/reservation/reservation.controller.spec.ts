/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';

describe('ReservationController', () => {
  let controller: ReservationController;

  const mockReservationService = {
    create: jest.fn((data) => ({ id: 1, ...data })),
    findAll: jest.fn(() => [{ id: 1 }]),
    delete: jest.fn((id) => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [{ provide: ReservationService, useValue: mockReservationService }],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
  });

  it('should create a reservation', async () => {
    const data: Reservation = { id: 1, date: new Date(), movieTitle: 'Inception', userId: 1 };
    expect(await controller.createReservation(data)).toEqual({ ...data });
  });

  it('should get all reservations', async () => {
    expect(await controller.getAllReservations()).toEqual([{ id: 1 }]);
  });

  it('should delete a reservation', async () => {
    expect(await controller.deleteReservation(1)).toEqual({ message: 'Reservation deleted successfully' });
  });
});
