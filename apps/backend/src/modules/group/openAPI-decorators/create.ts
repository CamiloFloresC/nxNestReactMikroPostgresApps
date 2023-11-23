import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SuccessResponseDto } from '../../../dto/success-response.dto';
import { CreateGroupDto } from '../dto/create-group.dto';
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';

export function createOpenAPI() {
  return applyDecorators(
    ApiBody({ type: CreateGroupDto }),
    ApiCreatedResponse({
      status: 201,
      description: 'Created Group success.',
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
    ApiOperation({ operationId: 'createGroup', summary: 'Create Group' })
  );
}
