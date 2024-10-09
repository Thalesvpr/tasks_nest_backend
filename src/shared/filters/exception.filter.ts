import { Catch, ExceptionFilter, ArgumentsHost, Logger, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Catch()
export class SystemExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(SystemExceptionFilter.name);

    constructor(private readonly configService: ConfigService) {}

    catch(exception: unknown, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status = 500;
        let message = 'Internal Server Error';
        let errors: any = null;


        const isProduction = this.configService.get<string>('NODE_ENV') === 'production';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
            if (exception instanceof BadRequestException) {
                const exceptionResponse = exception.getResponse();
                this.logger.warn('Validation errors occurred:', exceptionResponse);
                message = 'Validation Error';
                errors = exceptionResponse['message'];
            } else {
                this.logger.error(exception);
            }
        } else {
            this.logger.error('Unknown exception occurred:', exception);
        }

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
            ...(errors && { errors }),
            ...(!isProduction && { stacktrace: (exception as any).stack }),
        };

        response.status(status).json(errorResponse);
    }
}