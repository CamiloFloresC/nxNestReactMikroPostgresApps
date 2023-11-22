import { ApiResponseProperty } from '@nestjs/swagger';

export class NotFoundExceptionDto {
  @ApiResponseProperty()
  message: string;
  @ApiResponseProperty()
  error: string;
  @ApiResponseProperty()
  status: number;
}
