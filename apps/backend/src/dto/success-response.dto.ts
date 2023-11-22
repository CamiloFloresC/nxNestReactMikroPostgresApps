import { ApiResponseProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiResponseProperty()
  message: string;
  @ApiResponseProperty()
  status: number;
}
