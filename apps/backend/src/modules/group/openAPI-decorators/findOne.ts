import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { GetGroupDto } from '../dto/get-group.dto';
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';

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
      type: ErrorExecptionDto,
    }),
    ApiOperation({
      operationId: 'findGroupById',
      summary: 'find group by id',
    })
  );
}
