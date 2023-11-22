import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BadRequestExceptionDto } from '../../../dto/BadRequestException.dto';
import { NotFoundExceptionDto } from '../../../dto/NotFoundException.dto';
import { SuccessResponseDto } from '../../../dto/success-response.dto';
import { GroupIdDto } from '../dto/group-id.dto';

export function deleteAppFromAGroupOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'number',
      description: 'id Application',
    }),
    ApiBody({
      type: GroupIdDto,
      description: 'id Group',
    }),
    ApiResponse({
      status: 200,
      description: 'Delete app from a group',
      type: SuccessResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'BadRequestException',
      type: BadRequestExceptionDto,
    }),
    ApiResponse({
      status: 404,
      description: 'NotFoundException',
      type: NotFoundExceptionDto,
    }),
    ApiOperation({
      operationId: 'deleteAppFromAGroup',
      summary: 'Delete app from a group',
    })
  );
}
