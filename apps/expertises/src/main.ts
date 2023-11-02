import { NestFactory } from '@nestjs/core';
import { ExpertisesModule } from './expertises.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(ExpertisesModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('MICROSERVICE_PORT'),
    },
  });
  app.useLogger(app.get(Logger));
  const config = new DocumentBuilder()
      // .setTitle('Cinelly')
      // .setDescription('The Cinelly API description')
      // .setVersion('1.0')
      // .addTag('Cinelly')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('expertises/swagger-api', app, document);

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
