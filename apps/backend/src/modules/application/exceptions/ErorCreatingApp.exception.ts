import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorCreatingAppException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(
      msg || 'Error creating application',
      status || HttpStatus.BAD_REQUEST
    );
  }
}
