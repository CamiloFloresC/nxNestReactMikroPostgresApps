import { ApiResponseProperty } from '@nestjs/swagger';

export class GetGroupDto {
  @ApiResponseProperty()
  id: number;
  @ApiResponseProperty()
  name: string;
  @ApiResponseProperty()
  description: string;
  @ApiResponseProperty({ type: Date })
  createdAt: Date;
  @ApiResponseProperty({ type: Date })
  updatedAt: Date;
}
