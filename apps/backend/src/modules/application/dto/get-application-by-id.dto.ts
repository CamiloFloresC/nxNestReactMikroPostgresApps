import { ApiResponseProperty } from '@nestjs/swagger';
import { GetApplicationDto } from './get-application.dto';

export class GetApplicationByIdDto extends GetApplicationDto {
  @ApiResponseProperty()
  numberOfGroups: number;
}
