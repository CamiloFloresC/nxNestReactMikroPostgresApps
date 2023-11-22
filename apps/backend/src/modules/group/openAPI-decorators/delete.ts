import { BadRequestExceptionDto } from '../../../dto/BadRequestException.dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { SuccessResponseDto } from '../../../dto/success-response.dto';

export function deleteOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'number',
    }),
    ApiOkResponse({
      status: 200,
      description: 'delete group by id',
      type: SuccessResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'BadRequestException',
      type: BadRequestExceptionDto,
    }),
    ApiOperation({
      operationId: 'deleteGroupById',
      summary: 'delete group by id',
    })
  );
}
