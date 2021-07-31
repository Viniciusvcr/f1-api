import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Constructor')
export class Constructor {
  @PrimaryGeneratedColumn()
  id: number;
}
