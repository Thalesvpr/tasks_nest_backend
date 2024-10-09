import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from 'src/data-source';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSource.options, // Não precisa do `await dataSource.initialize()`
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
