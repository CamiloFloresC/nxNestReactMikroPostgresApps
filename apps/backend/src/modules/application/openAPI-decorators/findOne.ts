import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { GetApplicationDto } from '../dto/get-application.dto';
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';

export function findOneOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: 'find application by id',
      type: GetApplicationDto,
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
