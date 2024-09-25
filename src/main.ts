import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ValidationExceptionFilter } from './shared/filters/validation-excepion';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove valores que não estão nos DTOs
      forbidNonWhitelisted: true, // Retorna erro se um valor não estiver no DTO
      transform: true, // Transforma os dados para os tipos especificados nos DTOs
    }),
  );

  app.useGlobalFilters(
    new ValidationExceptionFilter(configService),
    new HttpExceptionFilter(configService),
  );

  await app.listen(3000);
}

bootstrap();
