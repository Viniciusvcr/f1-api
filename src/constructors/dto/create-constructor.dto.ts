import { IsNotEmpty } from 'class-validator';

export class CreateConstructorDto {
  @IsNotEmpty({ message: "Property 'name' is missing" })
  name: string;

  @IsNotEmpty({ message: "Property 'nationality' is missing" })
  nationality: string;

  @IsNotEmpty({ message: "Property 'foundationYear' is missing" })
  foundationYear: number;

  @IsNotEmpty({ message: "Property 'championshipEntryYear' is missing" })
  championshipEntryYear: number;

  championshipLeavingYear: number;

  website: string;

  previousName: string;
}
