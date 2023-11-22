import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { GetApplicationDto } from '../dto/get-application.dto';
import { NotFoundExceptionDto } from '../../../dto/NotFoundException.dto';

export function findOneOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'number',
    }),
    ApiResponse({
      status: 200,
      description: 'find application by id',
      type: GetApplicationDto,
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'NotFoundException',
      type: NotFoundExceptionDto,
    }),
    ApiOperation({
      operationId: 'findApplicationById',
      summary: 'find application by id',
    })
  );
}
