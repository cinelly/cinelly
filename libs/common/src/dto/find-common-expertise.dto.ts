import { IsArray } from 'class-validator';

export class FindCommonExpertiseDto {
  @IsArray()
  _id: string[];
}
