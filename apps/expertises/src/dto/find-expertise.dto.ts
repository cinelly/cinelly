import { IsObject } from 'class-validator';
import { FindCommonExpertiseDto } from '@app/common';
import {ApiProperty} from "@nestjs/swagger";

export class FindExpertiseDto {
  @ApiProperty()
  @IsObject()
  expertise: FindCommonExpertiseDto;
}
