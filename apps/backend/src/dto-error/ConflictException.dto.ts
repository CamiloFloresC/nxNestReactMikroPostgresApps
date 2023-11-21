import { ApiResponseProperty } from '@nestjs/swagger';

export class ConflictExceptionDto {
  @ApiResponseProperty()
  message: string;
  @ApiResponseProperty()
  error: string;
  @ApiResponseProperty()
  status: number;
}
