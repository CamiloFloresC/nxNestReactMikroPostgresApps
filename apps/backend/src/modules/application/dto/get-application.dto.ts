import { ApiResponseProperty } from '@nestjs/swagger';

export class GetApplicationDto {
  @ApiResponseProperty()
  id: number;
  @ApiResponseProperty()
  name: string;
  @ApiResponseProperty()
  description: string;
  @ApiResponseProperty()
  client_id: string;
}
