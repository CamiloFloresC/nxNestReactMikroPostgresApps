import { BadRequestExceptionDto } from '../../../dto/BadRequestException.dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { SuccessResponseDto } from '../../../dto/success-response.dto';

export function deleteOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: 'delete application by id',
      type: SuccessResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'BadRequestException',
      type: BadRequestExceptionDto,
    }),
    ApiOperation({
      operationId: 'deleteApplicationById',
      summary: 'delete application by id',
    })
  );
}
