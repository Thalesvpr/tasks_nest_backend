import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // Usando __dirname para definir os caminhos das entidades e migrações
  entities: [
    process.env.NODE_ENV === 'production'
      ? join(__dirname, '/**/entities/*.entity.js')
      : join(__dirname, '/**/entities/*.entity.ts')
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? join(__dirname, '/migrations/*.js')
      : join(__dirname, '/migrations/*.ts')
  ],
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
