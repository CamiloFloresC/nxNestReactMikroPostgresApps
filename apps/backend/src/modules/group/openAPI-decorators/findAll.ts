import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GetGroupDto } from '../dto/get-group.dto';
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';

export function findAllOpenAPI() {
  return applyDecorators(
    ApiCreatedResponse({
      status: 200,
      description: 'find all group',
      type: [GetGroupDto],
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'NotFoundException',
      type: ErrorExecptionDto,
    }),
    ApiOperation({
      operationId: 'findAllGroups',
      summary: 'find all Group',
    })
  );
}
