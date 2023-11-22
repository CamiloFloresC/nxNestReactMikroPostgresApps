import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class AddGroupDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number;
}
