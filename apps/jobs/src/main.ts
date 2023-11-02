import { NestFactory } from '@nestjs/core';
import { JobsModule } from './jobs.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(JobsModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
      // .setTitle('Jobs')
      // .setDescription('The Cinelly API description')
      // .setVersion('1.0')
      // .addTag('Cinelly')
      .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('jobs/swagger-api', app, document);

  await app.listen(configService.get('PORT'));
}
bootstrap();
