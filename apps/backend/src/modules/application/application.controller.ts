import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetApplicationDto } from './dto/get-application.dto';
import { SuccessApplicationDto } from './dto/success-application.dto';
import { BadRequestExceptionDto } from '../../dto-error/BadRequestException.dto';
import { ConflictExceptionDto } from '../../dto-error/ConflictException.dto';
import { NotFoundExceptionDto } from '../../dto-error/NotFoundException.dto';

@ApiTags('application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @HttpCode(201)
  @Post()
  @ApiBody({ type: CreateApplicationDto })
  @ApiCreatedResponse({
    status: 201,
    description: 'Created App success.',
    type: SuccessApplicationDto,
  })
  @ApiResponse({
    status: 400,
    description: 'BadRequestException',
    type: BadRequestExceptionDto,
  })
  @ApiResponse({
    status: 409,
    description: 'ConflictException',
    type: ConflictExceptionDto,
  })
  @ApiOperation({ operationId: 'createApplication', summary: 'Create App' })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @ApiResponse({
    status: 200,
    description: 'find all application',
    type: GetApplicationDto,
  })
  @ApiResponse({
    status: 404,
    description: 'NotFoundException',
    type: NotFoundExceptionDto,
  })
  @ApiOperation({
    operationId: 'findAllApplications',
    summary: 'find all application',
  })
  @HttpCode(200)
  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'find application by id',
    type: GetApplicationDto,
  })
  @ApiResponse({
    status: 404,
    description: 'NotFoundException',
    type: NotFoundExceptionDto,
  })
  @ApiOperation({
    operationId: 'findApplicationById',
    summary: 'find application by id',
  })
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.applicationService.findOne(+id);
  }

  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiBody({
    type: UpdateApplicationDto,
  })
  @ApiResponse({
    status: 200,
    description: 'update application by id',
    type: GetApplicationDto,
  })
  @ApiOperation({
    operationId: 'updateApplicationById',
    summary: 'update application by id',
  })
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateApplicationDto: UpdateApplicationDto
  ) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'delete application by id',
  })
  @ApiOperation({
    operationId: 'deleteApplicationById',
    summary: 'delete application by id',
  })
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.applicationService.remove(+id);
  }
}
