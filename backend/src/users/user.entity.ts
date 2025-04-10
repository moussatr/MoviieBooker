/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/reservation/reservation.entity'; 

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 'moussa_tr' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'moussa@gmail.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'password123' })
  @Column()
  password: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}