import { Catch, ExceptionFilter, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(ValidationExceptionFilter.name);

    constructor(private readonly configService: ConfigService) {}

    catch(exception: ValidationError[], host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
        const validationErrors = exception.map((err) => ({
            property: err.property,
            constraints: err.constraints,
        }));

        this.logger.warn('Validation errors occurred:', validationErrors);

        const message = isProduction ? 'Validation failed' : {
            message: 'Validation failed',
            errors: validationErrors,
        };

        response.status(400).json({
            statusCode: 400,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
