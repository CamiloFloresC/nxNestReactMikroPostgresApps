import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { SuccessResponseDto } from '../../../dto/success-response.dto';
import { BadRequestExceptionDto } from '../../../dto/BadRequestException.dto';
import { ConflictExceptionDto } from '../../../dto/ConflictException.dto';

export function createOpenAPI() {
  return applyDecorators(
    ApiBody({ type: CreateApplicationDto }),
    ApiCreatedResponse({
      status: 201,
      description: 'Created App success.',
      type: SuccessResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'BadRequestException',
      type: BadRequestExceptionDto,
    }),
    ApiConflictResponse({
      status: 409,
      description: 'ConflictException',
      type: ConflictExceptionDto,
    }),
    ApiOperation({ operationId: 'createApplication', summary: 'Create App' })
  );
}
