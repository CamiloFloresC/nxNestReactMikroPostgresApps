import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SuccessResponseDto } from '../../../dto/success-response.dto';
import { GroupIdDto } from '../dto/group-id.dto';
import { ErrorExecptionDto } from '../../../dto/ErrorException.dto';

export function deleteAppFromAGroupOpenAPI() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: 'string',
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
      type: ErrorExecptionDto,
    }),
    ApiResponse({
      status: 404,
      description: 'NotFoundException',
      type: ErrorExecptionDto,
    }),
    ApiOperation({
      operationId: 'deleteAppFromAGroup',
      summary: 'Delete app from a group',
    })
  );
}
