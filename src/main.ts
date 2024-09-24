import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove valores que não estão nos DTOs
      forbidNonWhitelisted: true, // Retorna erro se um valor não estiver no DTO
      transform: true, // Transforma os dados para os tipos especificados nos DTOs
    }),
  );


  await app.listen(3000);
}
bootstrap();
