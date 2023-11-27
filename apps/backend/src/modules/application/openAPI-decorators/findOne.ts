import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';
import { GetApplicationByIdDto } from '../dto/get-application-by-id.dto';

export function findOneOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: 'find application by id',
      type: GetApplicationByIdDto,
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'NotFoundException',
      type: ErrorExecptionDto,
    }),
    ApiOperation({
      operationId: 'findApplicationById',
      summary: 'find application by id',
    })
  );
}
