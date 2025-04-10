/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a reservation' })
    @ApiResponse({ status: 201, description: 'Reservation created successfully.', type: Reservation })
    @ApiResponse({ status: 400, description: 'Invalid data provided.' })
    @ApiBearerAuth()
    async createReservation(@Request() req, @Body() reservationData: Reservation): Promise<Reservation> {
      const user = req.user; 

      const dataWithUser = {
        ...reservationData, 
        user: user.id, 
      };
  
      return this.reservationService.create(dataWithUser);
    }

   @Get()
   @ApiOperation({ summary: 'Get all reservations' })
   @ApiResponse({ status: 200, description: 'Retrieve all reservations', type: [Reservation] })
   @ApiBearerAuth()
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
