/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/reservation/reservation.entity'; 

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 'john_doe' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'test@test.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'password123' })
  @Column()
  password: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}