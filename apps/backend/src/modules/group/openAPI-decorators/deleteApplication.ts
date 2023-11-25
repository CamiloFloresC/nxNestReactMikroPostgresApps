import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { SuccessResponseDto } from '../../../dto/success-response.dto';
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';
import { ApplicationIdDto } from '../dto/ApplicationIdDto.dto';

export function deleteApplicationOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'group id',
    }),
    ApiBody({
      type: ApplicationIdDto,
      description: 'id Application',
    }),
    ApiOkResponse({
      status: 200,
      description: 'delete application',
      type: SuccessResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'ErrorUpdatingGroupException',
      type: ErrorExecptionDto,
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'NotFoundException',
      type: ErrorExecptionDto,
    }),
    ApiOperation({
      operationId: 'deleteApplication',
      summary: 'delete application',
    })
  );
}
