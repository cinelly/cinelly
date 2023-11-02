import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateExpertiseDto {
  @ApiProperty()
  _id: string[];

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}
