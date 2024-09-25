
import { Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(HttpExceptionFilter.name)
    constructor(private readonly configService: ConfigService) {}

    catch(exception: HttpException, host) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        const isProduction = this.configService.get<string>('NODE_ENV') === 'production'

        if (isProduction) {
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: ctx.getRequest().url
            });
        }
        
        this.logger.error(exception)
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
            message: exception.message,
            stacktrace: exception.stack
        });
    }
}