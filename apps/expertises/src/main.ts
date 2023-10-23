import { NestFactory } from '@nestjs/core';
import { ExpertisesModule } from './expertises.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ExpertisesModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'expertises',
    },
  });
  console.log('test')
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
