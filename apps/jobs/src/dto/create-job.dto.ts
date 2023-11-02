import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { FindCommonExpertiseDto } from '@app/common';
import { Type } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateJobDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  expertise: FindCommonExpertiseDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @Type(() => Date)
  endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  budget: Number;

  @IsString()
  @IsNotEmpty()
  location: string;
}
