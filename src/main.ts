import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuração dos pipes globais
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Gerenciamento de Usuários e Tarefas')
    .setDescription('API para o gerenciamento de usuários, autenticação e tarefas.')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona autenticação Bearer
    .addTag('auth', 'Operações relacionadas à autenticação')
    .addTag('users', 'Operações relacionadas aos usuários')
    .addTag('tasks', 'Operações relacionadas às tarefas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`API rodando em: http://localhost:3000/api`);
}

bootstrap();
