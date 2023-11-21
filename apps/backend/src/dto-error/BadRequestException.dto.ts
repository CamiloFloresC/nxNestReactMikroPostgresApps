import { ApiResponseProperty } from '@nestjs/swagger';

export class BadRequestExceptionDto {
  @ApiResponseProperty()
  message: string[];
  @ApiResponseProperty()
  error: string;
  @ApiResponseProperty()
  status: number;
}
