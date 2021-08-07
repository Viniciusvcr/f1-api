import { Person } from 'src/people/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Constructor')
export class Constructor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Person, (person) => person.team)
  teamMembers: Person[];

  @Column()
  name: string;

  @Column()
  nationality: string;

  @Column({ type: 'integer' })
  foundationYear: number;

  @Column({ type: 'integer' })
  championshipEntryYear: number;

  @Column({ type: 'integer', nullable: true })
  championshipLeavingYear: number;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  previousName: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
