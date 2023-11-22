import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @IsOptional()
  @ApiPropertyOptional()
  name: string;
  @IsOptional()
  @ApiPropertyOptional()
  description: string;
}
