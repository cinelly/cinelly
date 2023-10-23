import { IsString } from 'class-validator';

export class CreateExpertiseDto {
  _id: string[];
  @IsString()
  name: string;
  @IsString()
  description: string;
}
