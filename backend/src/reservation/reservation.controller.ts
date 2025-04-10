/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
   @Post()
   @UseGuards(JwtAuthGuard)
   @ApiOperation({ summary: 'Create a reservation' }) // Description de l'action
   @ApiResponse({ status: 201, description: 'Reservation created successfully.', type: Reservation })
   @ApiResponse({ status: 400, description: 'Invalid data provided.' })
   @ApiBearerAuth()
   async createReservation(@Body() reservationData: Reservation): Promise<Reservation> {
     return this.reservationService.create(reservationData); 
   }

   @Get()
   @ApiOperation({ summary: 'Get all reservations' })
   @ApiResponse({ status: 200, description: 'Retrieve all reservations', type: [Reservation] })
   async getAllReservations():  Promise<Reservation[]> {
        return this.reservationService.findAll();  
    }

    @Post(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a reservation' })
    @ApiResponse({ status: 200, description: 'Reservation deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Reservation not found.' })
    @ApiBearerAuth()
    async deleteReservation(@Query('id') id: number): Promise<{ message: string }> {
        await this.reservationService.delete(id);
        return { message: 'Reservation deleted successfully' }; 
    }


}
