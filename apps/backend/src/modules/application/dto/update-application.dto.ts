import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicationDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  description: string;
}
