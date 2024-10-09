import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { AppConfig } from './shared/config/app.config';
import { SystemExceptionFilter } from './shared/filters/exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    DatabaseModule, TaskModule, UserModule, AuthModule],
  controllers: [AppController],
  
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: SystemExceptionFilter,
  },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    AppConfig.initialize(this.configService);
  }
}
