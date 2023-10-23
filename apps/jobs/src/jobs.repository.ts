import { Model } from 'mongoose';
import { AbstractDocument, AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { JobDocument } from './models/jobs.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JobsRepository extends AbstractRepository<AbstractDocument> {
  protected readonly logger = new Logger(JobsRepository.name);

  constructor(@InjectModel(JobDocument.name) jobModel: Model<JobDocument>) {
    super(jobModel);
  }
}
