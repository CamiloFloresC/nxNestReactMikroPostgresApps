import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApplicationIdDto {
  @ApiProperty()
  @IsString()
  id: string;
}
