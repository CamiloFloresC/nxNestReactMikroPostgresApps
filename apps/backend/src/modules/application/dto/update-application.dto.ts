import { IsOptional } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @IsOptional()
  @ApiPropertyOptional()
  name: string;
  @IsOptional()
  @ApiPropertyOptional()
  client_id: string;
  @IsOptional()
  @ApiPropertyOptional()
  description: string;
}
