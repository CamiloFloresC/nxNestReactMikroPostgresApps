import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorDeletingGroupException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Error deleting Group', status || HttpStatus.BAD_REQUEST);
  }
}
