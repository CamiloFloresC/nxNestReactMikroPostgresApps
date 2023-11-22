import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BadRequestExceptionDto } from '../../../dto/BadRequestException.dto';
import { NotFoundExceptionDto } from '../../../dto/NotFoundException.dto';
import { SuccessResponseDto } from '../../../dto/success-response.dto';
import { AddGroupDto } from '../dto/add-group.dto';

export function addGroupOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'number',
      description: 'id Application',
    }),
    ApiBody({
      type: AddGroupDto,
      description: 'id Group',
    }),
    ApiResponse({
      status: 200,
      description: 'add group',
      type: SuccessResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'BadRequestException',
      type: BadRequestExceptionDto,
    }),
    ApiResponse({
      status: 404,
      description: 'NotFoundException',
      type: NotFoundExceptionDto,
    }),
    ApiOperation({
      operationId: 'addGroup',
      summary: 'add group',
    })
  );
}
