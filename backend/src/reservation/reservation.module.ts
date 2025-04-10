/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), UsersModule, AuthModule],
  providers: [ReservationService, JwtService],
  controllers: [ReservationController],
  exports: [ReservationService], 
})
export class ReservationModule {}
