import { ConfigService } from '@nestjs/config';

export class AppConfig {
  private static secretKey: string;

  static initialize(configService: ConfigService) {
    AppConfig.secretKey = configService.get<string>('SECRET_KEY');
  }

  static getSecretKey(): string {
    return AppConfig.secretKey;
  }
}
