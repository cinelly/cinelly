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

export class CreateJobDto {
  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  expertise: FindCommonExpertiseDto;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  description: string;

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
