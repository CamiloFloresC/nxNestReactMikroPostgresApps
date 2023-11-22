import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { BadRequestExceptionDto } from '../../../dto/BadRequestException.dto';
import { NotFoundExceptionDto } from '../../../dto/NotFoundException.dto';
import { SuccessResponseDto } from '../../../dto/success-response.dto';

export function updateOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
    }),
    ApiBody({
      type: UpdateApplicationDto,
    }),
    ApiResponse({
      status: 200,
      description: 'update application by id',
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
      operationId: 'updateApplicationById',
      summary: 'update application by id',
    })
  );
}
