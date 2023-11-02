import { IsArray } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class FindCommonExpertiseDto {
  @ApiProperty()
  @IsArray()
  _id: string[];
}
