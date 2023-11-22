import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  client_id: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  group: number;
}
