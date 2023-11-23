import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { SuccessResponseDto } from '../../dto/success-response.dto';
import { GetGroupDto } from './dto/get-group.dto';
import { ErrorUpdatingGroupException } from './exceptions/ErrorUpdatingGroup.exception';
import { ErrorCreatingGroupException } from './exceptions/ErrorCreatingGroupException';
import { ErrorDeletingGroupException } from './exceptions/ErrorDeletingGroup.exception';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: EntityRepository<Group>,
    private readonly em: EntityManager
  ) {}
  async create(createGroupDto: CreateGroupDto): Promise<SuccessResponseDto> {
    try {
      const applicationverify = await this.groupRepository.findOne({
        name: createGroupDto.name,
      });
      if (applicationverify) {
        throw new ConflictException('This group already exists');
      }
      const create = this.groupRepository.create(createGroupDto);
      try {
        await this.em.persist(create).flush();
      } catch (error) {
        throw new ErrorCreatingGroupException();
      }

      return {
        message: 'Successfully created',
        status: 201,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<GetGroupDto[]> {
    try {
      const groups = await this.groupRepository.findAll();
      if (!groups) {
        throw new NotFoundException('List of groups not found');
      }
      return groups;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<GetGroupDto> {
    try {
      const group = await this.groupRepository.findOne(id);
      if (!group) {
        throw new NotFoundException('group not found');
      }
      return group;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateGroupDto: UpdateGroupDto
  ): Promise<SuccessResponseDto> {
    try {
      const group = await this.groupRepository.findOne(id);
      if (!group) {
        throw new NotFoundException('group not found');
      }

      if (!updateGroupDto.name) {
        updateGroupDto.name = group.name;
      }

      if (!updateGroupDto.description) {
        updateGroupDto.description = group.description;
      }
      try {
        await this.groupRepository.nativeUpdate(id, {
          description: updateGroupDto.description,
          name: updateGroupDto.name,
          updatedAt: new Date(),
        });
      } catch (error) {
        throw new ErrorUpdatingGroupException('Error updating group');
      }
      return {
        message: 'Successfully update',
        status: 200,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<SuccessResponseDto> {
    try {
      const group = await this.groupRepository.findOne(id);
      if (!group) {
        throw new NotFoundException('group not found');
      }
      try {
        await this.em.getRepository(Group).nativeDelete(id);
      } catch (error) {
        throw new ErrorDeletingGroupException();
      }
      return {
        message: 'Successfully delete',
        status: 200,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
