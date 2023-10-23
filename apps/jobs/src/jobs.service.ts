import { Inject, Injectable } from '@nestjs/common';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsRepository } from './jobs.repository';
import { EXPERTISE_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateJobDto } from './dto/create-job.dto';
import { map } from 'rxjs';

@Injectable()
export class JobsService {
  constructor(
    private readonly jobsRepository: JobsRepository,
    @Inject(EXPERTISE_SERVICE) private readonly expertiseService: ClientProxy,
  ) {}

  async create(createJobDto: CreateJobDto) {
    return this.expertiseService.send('read_expertise', createJobDto).pipe(
      map(async (res) => {
        console.log(res);
        return this.jobsRepository.create({
          ...createJobDto,
          expertise: res,
          timestamp: new Date(),
        });
      }),
    );
  }

  async findAll() {
    return this.jobsRepository.find({});
  }

  async findOne(_id: string) {
    return this.jobsRepository.findOne({ _id });
  }

  async update(_id: string, updateJobDto: UpdateJobDto) {
    return this.jobsRepository.findOneAndUpdate(
      { _id },
      { $set: updateJobDto },
    );
  }

  async remove(_id: string) {
    return this.jobsRepository.findOneAndDelete({ _id });
  }
}
