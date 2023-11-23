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
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';

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
      type: ErrorExecptionDto,
    }),
    ApiConflictResponse({
      status: 409,
      description: 'ConflictException',
      type: ErrorExecptionDto,
    }),
    ApiOperation({ operationId: 'createApplication', summary: 'Create App' })
  );
}
