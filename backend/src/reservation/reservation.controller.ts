/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
   @Post()
   async createReservation(@Body() reservationData: Reservation) {
     return this.reservationService.create(reservationData); 
   }

   @Get()
   async getAllReservations() 
    {
        return this.reservationService.findAll();  
    }

    @Post(':id')
    async deleteReservation(@Query() id: number) {
        return this.reservationService.delete(id);
    }


}
