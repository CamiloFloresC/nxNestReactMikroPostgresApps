import {
  BadRequestException,
  ConflictException,
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

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: EntityRepository<Group>,
    private readonly em: EntityManager
  ) {}
  async create(createGroupDto: CreateGroupDto): Promise<SuccessResponseDto> {
    try {
      if (!createGroupDto.name) {
        throw new BadRequestException('name is required');
      }

      if (!createGroupDto.description) {
        throw new BadRequestException('description is required');
      }
      const applicationverify = await this.groupRepository.findOne({
        name: createGroupDto.name,
      });
      if (applicationverify) {
        throw new ConflictException('This group already exists');
      }
      const create = this.groupRepository.create(createGroupDto);
      if (!create) {
        throw new BadRequestException('Error creating application');
      }

      await this.em.persist(create).flush();

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
      throw new Error(error.message);
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
      throw new Error(error);
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
      throw new Error(error);
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
        throw new BadRequestException('name is required');
      }

      if (!updateGroupDto.description) {
        throw new BadRequestException('description is required');
      }
      await this.groupRepository.nativeUpdate(id, {
        description: updateGroupDto.description,
        name: updateGroupDto.name,
        updatedAt: new Date(),
      });
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
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<SuccessResponseDto> {
    try {
      const group = await this.groupRepository.findOne(id);
      if (!group) {
        throw new NotFoundException('group not found');
      }
      await this.em.getRepository(Group).nativeDelete(id);

      return {
        message: 'Successfully delete',
        status: 200,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(error);
    }
  }
}
