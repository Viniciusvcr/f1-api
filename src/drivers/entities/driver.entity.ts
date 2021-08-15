import { Person } from 'src/people/entities/person.entity';
import { Column, Entity } from 'typeorm';

@Entity('Driver')
export class Driver extends Person {
  @Column({ type: 'integer' })
  carNumber: number;

  @Column({ type: 'integer', default: 0 })
  grandPrixEntries: number;

  @Column({ type: 'integer', default: 0 })
  WDCs: number;

  @Column({ type: 'integer', default: 0 })
  wins: number;

  @Column({ type: 'integer', default: 0 })
  podiums: number;

  @Column({ type: 'float', default: 0.0 })
  careerPoints: number;

  @Column({ type: 'integer', default: 0 })
  fastestLaps: number;

  @Column({ nullable: true })
  firstGrandPrix?: string;

  @Column({ nullable: true })
  lastGrandPrix?: string;

  @Column({ nullable: true, default: null })
  firstVictory?: string;

  @Column({ nullable: true, default: null })
  lastVictory?: string;
}
