import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SuccessResponseDto } from '../../../dto/success-response.dto';
import { BadRequestExceptionDto } from '../../../dto/BadRequestException.dto';
import { ConflictExceptionDto } from '../../../dto/ConflictException.dto';
import { CreateGroupDto } from '../dto/create-group.dto';

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
      type: BadRequestExceptionDto,
    }),
    ApiConflictResponse({
      status: 409,
      description: 'ConflictException',
      type: ConflictExceptionDto,
    }),
    ApiOperation({ operationId: 'createGroup', summary: 'Create Group' })
  );
}
