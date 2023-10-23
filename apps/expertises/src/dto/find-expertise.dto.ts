import { IsObject } from 'class-validator';
import { FindCommonExpertiseDto } from '@app/common';

export class FindExpertiseDto {
  @IsObject()
  expertise: FindCommonExpertiseDto;
}
