import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorUpdatingAppException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Error updating app', status || HttpStatus.BAD_REQUEST);
  }
}
