import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  addGroupOpenAPI,
  createOpenAPI,
  deleteOpenAPI,
  findAllOpenAPI,
  findOneOpenAPI,
  updateOpenAPI,
} from './openAPI-decorators';
import { SuccessResponseDto } from '../../dto/success-response.dto';
import { GetApplicationDto } from './dto/get-application.dto';
import { GroupIdDto } from './dto/group-id.dto';
import { findByGroupIdOpenAPI } from './openAPI-decorators/findByGroupId';

@ApiTags('application')
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<GetApplicationDto> {
    return this.applicationService.findOne(id);
  }

  @findByGroupIdOpenAPI()
  @Get('group/:id')
  findOneByGroupId(
    @Param('id', ParseIntPipe) id: number
  ): Promise<GetApplicationDto[]> {
    return this.applicationService.findOneByGroupId(id);
  }

  @updateOpenAPI()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApplicationDto: UpdateApplicationDto
  ): Promise<SuccessResponseDto> {
    return this.applicationService.update(id, updateApplicationDto);
  }

  @deleteOpenAPI()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponseDto> {
    return this.applicationService.remove(id);
  }

  @addGroupOpenAPI()
  @Patch('group/:id')
  addGroup(
    @Param('id') id: number,
    @Body() groupIdDto: GroupIdDto
  ): Promise<SuccessResponseDto> {
    return this.applicationService.addGroup(id, groupIdDto.id);
  }
}
