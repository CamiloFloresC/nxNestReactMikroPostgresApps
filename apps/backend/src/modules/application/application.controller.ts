import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  createOpenAPI,
  deleteOpenAPI,
  findAllOpenAPI,
  findOneOpenAPI,
  updateOpenAPI,
} from './openAPI-decorators';
import { SuccessResponseDto } from '../../dto/success-response.dto';
import { GetApplicationDto } from './dto/get-application.dto';
import { findByGroupIdOpenAPI } from './openAPI-decorators/findByGroupId';
import { HttpExceptionFilter } from '../../filters/HttpException.filter';
import { GetApplicationByIdDto } from './dto/get-application-by-id.dto';

@ApiTags('application')
@UseFilters(HttpExceptionFilter)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @createOpenAPI()
  @Post()
  create(
    @Body() createApplicationDto: CreateApplicationDto
  ): Promise<SuccessResponseDto> {
    return this.applicationService.create(createApplicationDto);
  }

  @findAllOpenAPI()
  @Get()
  findAll(): Promise<GetApplicationDto[]> {
    return this.applicationService.findAll();
  }

  @findOneOpenAPI()
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<GetApplicationByIdDto> {
    return this.applicationService.findOne(id);
  }

  @findByGroupIdOpenAPI()
  @Get('group/:id')
  findByGroupId(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<GetApplicationDto[]> {
    return this.applicationService.findByGroupId(id);
  }

  @updateOpenAPI()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateApplicationDto: UpdateApplicationDto
  ): Promise<SuccessResponseDto> {
    return this.applicationService.update(id, updateApplicationDto);
  }

  @deleteOpenAPI()
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<SuccessResponseDto> {
    return this.applicationService.delete(id);
  }
}
