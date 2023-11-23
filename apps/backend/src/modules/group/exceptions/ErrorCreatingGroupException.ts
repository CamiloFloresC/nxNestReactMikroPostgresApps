import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorCreatingGroupException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Error creating Group', status || HttpStatus.BAD_REQUEST);
  }
}
