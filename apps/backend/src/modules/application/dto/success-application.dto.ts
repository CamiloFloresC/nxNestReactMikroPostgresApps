import { ApiResponseProperty } from '@nestjs/swagger';

export class SuccessApplicationDto {
  @ApiResponseProperty()
  message: string;
  @ApiResponseProperty()
  status: number;
}
