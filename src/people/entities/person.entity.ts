import { Constructor } from 'src/constructors/entities/constructor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonRole } from './role.enum';

@Entity('Person')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Constructor, (constructor) => constructor.teamMembers, {
    nullable: true,
  })
  currentTeam?: Constructor;

  @Column()
  name: string;

  @Column()
  nationality: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  birthplace: string;

  @Column({ type: 'float' })
  height: number;

  @Column({ type: 'enum', enum: PersonRole })
  role: PersonRole;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
