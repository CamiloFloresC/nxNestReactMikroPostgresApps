import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { GetApplicationDto } from '../dto/get-application.dto';
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';

export function findAllOpenAPI() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'find all application',
      type: [GetApplicationDto],
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'NotFoundException',
      type: ErrorExecptionDto,
    }),
    ApiOperation({
      operationId: 'findAllApplications',
      summary: 'find all application',
    })
  );
}
