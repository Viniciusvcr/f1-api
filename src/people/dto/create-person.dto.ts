import { IsNotEmpty } from 'class-validator';
import { Constructor } from 'src/constructors/entities/constructor.entity';
import { PersonRole } from '../entities/role.enum';

export class CreatePersonDto {
  team: Pick<Constructor, 'id'>;

  @IsNotEmpty({ message: "Property 'name' is missing" })
  name: string;

  @IsNotEmpty({ message: "Property 'nationality' is missing" })
  nationality: string;

  @IsNotEmpty({ message: "Property 'birthday' is missing" })
  birthday: Date;

  @IsNotEmpty({ message: "Property 'birthplace' is missing" })
  birthplace: string;

  @IsNotEmpty({ message: "Property 'name' is missing" })
  height: number;

  @IsNotEmpty({ message: "Property 'role' is missing" })
  role: PersonRole;
}
