import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'src/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigService disponível em todo o projeto
    }),
    TypeOrmModule.forRoot(dataSourceOptions)
  ],
})
export class DatabaseModule {}
