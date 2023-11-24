import { ApiResponseProperty } from '@nestjs/swagger';
enum GroupType {
  String = 'string',
  Null = 'null',
}

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

  @ApiResponseProperty()
  client_id: string;
  @ApiResponseProperty({ enum: Object.values(GroupType) })
  group?: string | null;
}
