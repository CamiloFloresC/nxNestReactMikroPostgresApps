import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorUpdatingGroupException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(
      msg || 'Error updating group',
      status || HttpStatus.BAD_REQUEST
    );
  }
}
