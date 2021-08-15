import { IsNotEmpty } from 'class-validator';

export class RaceResultDto {
  @IsNotEmpty({ message: "Property 'grandPrixName' is missing" })
  grandPrixName: string;

  @IsNotEmpty({ message: "Property 'fastestLap' is missing" })
  fastestLap: boolean;

  @IsNotEmpty({ message: "Property 'points' is missing" })
  points: number;

  @IsNotEmpty({ message: "Property 'position' is missing" })
  position: number;
}
