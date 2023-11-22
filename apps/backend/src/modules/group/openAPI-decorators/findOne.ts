import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { NotFoundExceptionDto } from '../../../dto/NotFoundException.dto';
import { GetGroupDto } from '../dto/get-group.dto';

export function findOneOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: 'find group by id',
      type: GetGroupDto,
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'NotFoundException',
      type: NotFoundExceptionDto,
    }),
    ApiOperation({
      operationId: 'findGroupById',
      summary: 'find group by id',
    })
  );
}
