import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class GroupIdDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number;
}