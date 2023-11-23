import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { SuccessResponseDto } from '../../../dto/success-response.dto';
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';

export function deleteOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
    }),
    ApiOkResponse({
      status: 200,
      description: 'delete group by id',
      type: SuccessResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'BadRequestException',
      type: ErrorExecptionDto,
    }),
    ApiOperation({
      operationId: 'deleteGroupById',
      summary: 'delete group by id',
    })
  );
}
