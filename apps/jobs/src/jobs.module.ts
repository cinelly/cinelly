import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { DatabaseModule, EXPERTISE_SERVICE, LoggerModule } from '@app/common';
import { JobDocument, JobSchema } from './models/jobs.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JobsRepository } from './jobs.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: JobDocument.name, schema: JobSchema }]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        EXPERTISES_HOST: Joi.string().required(),
        EXPERTISES_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: EXPERTISE_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('EXPERTISES_HOST'),
            port: configService.get('EXPERTISES_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository],
})
export class JobsModule {}
