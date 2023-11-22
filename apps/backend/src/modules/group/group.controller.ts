import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  createOpenAPI,
  findAllOpenAPI,
  findOneOpenAPI,
  updateOpenAPI,
  deleteOpenAPI,
} from './openAPI-decorators';
import { GetGroupDto } from './dto/get-group.dto';
import { SuccessResponseDto } from '../../dto/success-response.dto';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @createOpenAPI()
  @Post()
  create(@Body() createGroupDto: CreateGroupDto): Promise<SuccessResponseDto> {
    return this.groupService.create(createGroupDto);
  }

  @findAllOpenAPI()
  @Get()
  findAll(): Promise<GetGroupDto[]> {
    return this.groupService.findAll();
  }

  @findOneOpenAPI()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<GetGroupDto> {
    return this.groupService.findOne(id);
  }

  @updateOpenAPI()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateGroupDto
  ): Promise<SuccessResponseDto> {
    return this.groupService.update(id, updateGroupDto);
  }

  @deleteOpenAPI()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponseDto> {
    return this.groupService.remove(id);
  }
}
