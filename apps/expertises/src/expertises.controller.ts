import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpertisesService } from './expertises.service';
import { FindExpertiseDto } from './dto/find-expertise.dto';
import { CreateExpertiseDto } from './dto/create-expertise.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('expertises')
export class ExpertisesController {
  constructor(private readonly expertisesService: ExpertisesService) {}

  @Post()
  async create(@Body() createExpertiseDto: CreateExpertiseDto) {
    return this.expertisesService.create(createExpertiseDto);
  }

  @Get()
  findAll() {
    return this.expertisesService.findAll();
  }

  @MessagePattern('read_expertise')
  @UsePipes(new ValidationPipe())
  @Get('find')
  findMultiple(@Body() data: FindExpertiseDto) {
    console.log('read-dto\t', data);
    return this.expertisesService.findMultipleExpertises(data);
  }
}
