import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorDeletingAppException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(
      msg || 'Error deleting application',
      status || HttpStatus.BAD_REQUEST
    );
  }
}
