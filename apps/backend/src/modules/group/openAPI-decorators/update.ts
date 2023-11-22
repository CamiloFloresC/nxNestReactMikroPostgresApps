import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { BadRequestExceptionDto } from '../../../dto/BadRequestException.dto';
import { NotFoundExceptionDto } from '../../../dto/NotFoundException.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { SuccessResponseDto } from '../../../dto/success-response.dto';

export function updateOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'number',
    }),
    ApiBody({
      type: UpdateGroupDto,
    }),
    ApiOkResponse({
      status: 200,
      description: 'update group by id',
      type: SuccessResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'BadRequestException',
      type: BadRequestExceptionDto,
    }),
    ApiNotFoundResponse({
      status: 404,
      description: 'NotFoundException',
      type: NotFoundExceptionDto,
    }),
    ApiOperation({
      operationId: 'updateGroupById',
      summary: 'update group by id',
    })
  );
}
