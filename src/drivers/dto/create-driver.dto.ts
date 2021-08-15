import { IsNotEmpty, IsOptional } from 'class-validator';
import { Constructor } from 'src/constructors/entities/constructor.entity';
import { PersonRole } from 'src/people/entities/role.enum';

export class CreateDriverDto {
  @IsNotEmpty({ message: "Property 'currentTeam' is missing" })
  currentTeam: Pick<Constructor, 'id'>;

  @IsNotEmpty({ message: "Property 'name' is missing" })
  name: string;

  @IsNotEmpty({ message: "Property 'nationality' is missing" })
  nationality: string;

  @IsNotEmpty({ message: "Property 'birthday' is missing" })
  birthday: Date;

  @IsNotEmpty({ message: "Property 'birthplace' is missing" })
  birthplace: string;

  @IsNotEmpty({ message: "Property 'height' is missing" })
  height: number;

  @IsNotEmpty({ message: "Property 'carNumber' is missing" })
  carNumber: number;

  @IsNotEmpty({ message: "Property 'role' is missing" })
  role = PersonRole.DRIVER | PersonRole.RETIRED_DRIVER;

  @IsOptional()
  grandPrixEntries?: number;

  @IsOptional()
  WDC?: number;

  @IsOptional()
  wins?: number;

  @IsOptional()
  podiums?: number;

  @IsOptional()
  careerPoints?: number;

  @IsOptional()
  fastestLaps?: number;

  @IsOptional()
  firstGrandPrix?: string;

  @IsOptional()
  lastGrandPrix?: string;

  @IsOptional()
  firstVictory?: string;

  @IsOptional()
  lastVictory?: string;
}
