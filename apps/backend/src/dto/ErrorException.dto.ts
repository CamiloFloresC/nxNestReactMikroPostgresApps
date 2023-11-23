import { ApiResponseProperty } from '@nestjs/swagger';

export class ErrorExecptionDto {
  @ApiResponseProperty()
  statusCode: number;
  @ApiResponseProperty()
  error: string;
  @ApiResponseProperty()
  timestamp: string;
  @ApiResponseProperty()
  path: string;
}
