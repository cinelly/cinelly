import { ExpertiseDocument } from './models/expertise.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractDocument, AbstractRepository } from '@app/common';

@Injectable()
export class ExpertisesRepository extends AbstractRepository<AbstractDocument> {
  protected readonly logger = new Logger(ExpertisesRepository.name);

  constructor(
    @InjectModel(ExpertiseDocument.name)
    expertiseModel: Model<ExpertiseDocument>,
  ) {
    super(expertiseModel);
  }
}
