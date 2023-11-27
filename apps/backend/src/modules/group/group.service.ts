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
import { EntityManager } from '@mikro-orm/postgresql';
import { SuccessResponseDto } from '../../dto/success-response.dto';
import { GetGroupDto } from './dto/get-group.dto';
import { ErrorUpdatingGroupException } from './exceptions/ErrorUpdatingGroup.exception';
import { ErrorCreatingGroupException } from './exceptions/ErrorCreatingGroupException';
import { ErrorDeletingGroupException } from './exceptions/ErrorDeletingGroup.exception';
import { ApplicationIdDto } from './dto/ApplicationIdDto.dto';
import { Application, Group } from '../../entities';

@Injectable()
export class GroupService {
  constructor(private readonly entityManager: EntityManager) {}
  async create(createGroupDto: CreateGroupDto): Promise<SuccessResponseDto> {
    try {
      const applicationverify = await this.entityManager
        .getRepository(Group)
        .findOne({
          name: createGroupDto.name,
        });
      if (applicationverify) {
        throw new ConflictException('This group already exists');
      }
      const created = this.entityManager
        .getRepository(Group)
        .create(createGroupDto);
      try {
        await this.entityManager.persistAndFlush(created);
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
      } else if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async findAll(): Promise<GetGroupDto[]> {
    try {
      const groups = await this.entityManager.getRepository(Group).findAll();
      if (!groups) {
        throw new NotFoundException('List of groups not found');
      }
      return groups;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async findOne(id: string): Promise<GetGroupDto> {
    try {
      const group = await this.entityManager.getRepository(Group).findOne(id);
      if (!group) {
        throw new NotFoundException('group not found');
      }
      return group;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async update(
    id: string,
    updateGroupDto: UpdateGroupDto
  ): Promise<SuccessResponseDto> {
    try {
      const group = await this.entityManager.getRepository(Group).findOne(id);
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
        group.name = updateGroupDto.name || group.name;
        group.description = updateGroupDto.description || group.description;
        await this.entityManager.persistAndFlush(group);
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
      } else if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async addApplication(
    id: string,
    applicationIdDto: ApplicationIdDto
  ): Promise<SuccessResponseDto> {
    try {
      const group = await this.entityManager.getRepository(Group).findOne(id);
      if (!group) {
        throw new NotFoundException('group not found');
      }
      await group.applications.init();
      const applicationverify = group.applications.find(
        (app) => app.id === applicationIdDto.id
      );
      if (applicationverify) {
        throw new NotFoundException('this application already exists');
      }
      const application = await this.entityManager
        .getRepository(Application)
        .findOne(applicationIdDto.id);
      group.applications.add(application);
      try {
        await this.entityManager.persistAndFlush(group);
      } catch (error) {
        throw new ErrorUpdatingGroupException('error add application');
      }
      return {
        message: 'Successfully add Application',
        status: 200,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof ErrorUpdatingGroupException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async deleteApplication(
    id: string,
    applicationIdDto: ApplicationIdDto
  ): Promise<SuccessResponseDto> {
    try {
      const group = await this.entityManager.getRepository(Group).findOne(id);
      if (!group) {
        throw new NotFoundException('group not found');
      }
      await group.applications.init();
      const applicationToRemove = group.applications.find(
        (app) => app.id === applicationIdDto.id
      );
      if (!applicationToRemove) {
        throw new NotFoundException('Application not found in the group');
      }

      try {
        group.applications.remove(applicationToRemove);
        await this.entityManager.persistAndFlush(group);
      } catch (error) {
        throw new ErrorUpdatingGroupException('error deleting application');
      }
      return {
        message: 'Successfully delete Application',
        status: 200,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof ErrorUpdatingGroupException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async delete(id: string): Promise<SuccessResponseDto> {
    try {
      const group = await this.entityManager.getRepository(Group).findOne(id);
      if (!group) {
        throw new NotFoundException('group not found');
      }
      try {
        await this.entityManager.getRepository(Group).nativeDelete(id);
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
      } else {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.BAD_REQUEST
        );
      }
    }
  }
}
