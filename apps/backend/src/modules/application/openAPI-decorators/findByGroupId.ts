import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { NotFoundExceptionDto } from '../../../dto/NotFoundException.dto';
import { GetApplicationDto } from '../dto/get-application.dto';

export function findByGroupIdOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'id group',
    }),
    ApiResponse({
      status: 200,
      description: 'find application by group id',
      type: [GetApplicationDto],
    }),
    ApiResponse({
      status: 404,
      description: 'NotFoundException',
      type: NotFoundExceptionDto,
    }),
    ApiOperation({
      operationId: 'findByGroupId',
      summary: 'find application by group id',
    })
  );
}
