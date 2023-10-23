import { Module } from '@nestjs/common';
import { ExpertisesController } from './expertises.controller';
import { ExpertisesService } from './expertises.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ExpertiseDocument, ExpertiseSchema } from './models/expertise.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ExpertisesRepository } from './expertises.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ExpertiseDocument.name, schema: ExpertiseSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [ExpertisesController],
  providers: [ExpertisesService, ExpertisesRepository],
})
export class ExpertisesModule {}
