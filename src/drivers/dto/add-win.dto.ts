import { IsNotEmpty } from 'class-validator';

export class AddWinDto {
  @IsNotEmpty({ message: "Property 'fastestLap' is missing" })
  fastestLap: boolean;

  @IsNotEmpty({ message: "Property 'grandPrixName' is missing" })
  grandPrixName: string;

  @IsNotEmpty({ message: "Property 'firstVictory' is missing" })
  firstVictory: boolean;

  @IsNotEmpty({ message: "Property 'pointsAwarded' is missing" })
  pointsAwarded: number;
}
