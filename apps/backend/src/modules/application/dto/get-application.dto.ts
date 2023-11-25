import { ApiResponseProperty } from '@nestjs/swagger';

export class GetApplicationDto {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;
}
