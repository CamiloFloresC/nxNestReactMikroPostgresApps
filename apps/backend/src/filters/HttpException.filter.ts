import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../interfaces/ErrorResponse.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse: ErrorResponse =
      exception.getResponse() as ErrorResponse;
    let errorMessage = errorResponse.message;
    if (Array.isArray(errorMessage)) {
      errorMessage = errorMessage.join(', ');
    }
    if (errorMessage === undefined) {
      errorMessage = exception.getResponse().toString();
    }
    response.status(status).send({
      statusCode: status,
      error: errorMessage || 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
