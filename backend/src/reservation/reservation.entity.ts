/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'; 

import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({ example: '2023-10-01T12:00:00Z' })
    @Column()
    startDate: Date;
    
    @ApiProperty({ example: '2023-10-02T12:00:00Z' })
    @Column()
    endDate: Date;
    
    @ApiProperty({ example: '12345' })
    @Column()
    reservationCode: string;
    
    @ManyToOne(() => User, (user) => user.reservations)
    user: User;
}