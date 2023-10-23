import { BadRequestException, Injectable } from '@nestjs/common';
import { FindExpertiseDto } from './dto/find-expertise.dto';
import { CreateExpertiseDto } from './dto/create-expertise.dto';
import { ExpertisesRepository } from './expertises.repository';

@Injectable()
export class ExpertisesService {
  constructor(private readonly expertiseRepository: ExpertisesRepository) {}
  public async create(createExpertiseDto: CreateExpertiseDto) {
    const expertise = await this.expertiseRepository.find({
      name: createExpertiseDto.name,
    });

    console.log(expertise);

    if (expertise && expertise.length > 0) {
      throw new BadRequestException('Expertise already exists');
    }

    return this.expertiseRepository.create({
      ...createExpertiseDto,
    });
  }

  async findAll() {
    return this.expertiseRepository.find({});
  }

  async findMultipleExpertises(data: FindExpertiseDto) {
    const expertiseIds = data.expertise._id.map((exp) => exp);

    console.log('Service\t' + expertiseIds);
    return this.expertiseRepository.findMany({ _id: { $in: expertiseIds } });
  }
}
