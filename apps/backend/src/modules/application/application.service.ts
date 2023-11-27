import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { SuccessResponseDto } from '../../dto/success-response.dto';
import { GetApplicationDto } from './dto/get-application.dto';
import { ErrorCreatingAppException } from './exceptions/ErrorCreatingApp.exception';
import { ErrorUpdatingAppException } from './exceptions/ErrorUpdatingApp.exception';
import { ErrorDeletingAppException } from './exceptions/ErrorDeletingApp.exception';
import { GetApplicationByIdDto } from './dto/get-application-by-id.dto';
import { Group, Application } from '../../entities';

@Injectable()
export class ApplicationService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(
    createApplicationDto: CreateApplicationDto
  ): Promise<SuccessResponseDto> {
    try {
      const applicationverify = await this.entityManager
        .getRepository(Application)
        .findOne({
          name: createApplicationDto.name,
        });
      if (applicationverify) {
        throw new ConflictException('This application already exists');
      }
      const created = this.entityManager
        .getRepository(Application)
        .create(createApplicationDto);
      try {
        await this.entityManager.persistAndFlush(created);
      } catch (error) {
        throw new ErrorCreatingAppException('Error creating application', 400);
      }
      return {
        message: 'Successfully created',
        status: 201,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async findAll(): Promise<GetApplicationDto[]> {
    try {
      const applications = await this.entityManager
        .getRepository(Application)
        .findAll();
      if (!applications) {
        throw new NotFoundException('List of apps not found');
      }
      return applications;
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

  async findOne(id: string): Promise<GetApplicationByIdDto> {
    try {
      const application = await this.entityManager
        .getRepository(Application)
        .findOne(id);
      if (!application) {
        throw new NotFoundException('app not found');
      }
      const groups = await this.entityManager.getRepository(Group).find({
        applications: id,
      });
      return {
        id: application.id,
        name: application.name,
        description: application.description,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
        numberOfGroups: groups.length,
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

  async findByGroupId(idGroup: string): Promise<GetApplicationDto[]> {
    try {
      const applications = await this.entityManager
        .getRepository(Application)
        .find({
          groups: idGroup,
        });
      if (!applications) {
        throw new NotFoundException('List of apps not found');
      }
      return applications;
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
    updateApplicationDto: UpdateApplicationDto
  ): Promise<SuccessResponseDto> {
    try {
      const application = await this.entityManager
        .getRepository(Application)
        .findOne(id);
      if (!application) {
        throw new NotFoundException('app not found');
      }

      if (!updateApplicationDto.name) {
        updateApplicationDto.name = application.name;
      }

      if (!updateApplicationDto.description) {
        updateApplicationDto.description = application.description;
      }
      try {
        application.name = updateApplicationDto.name || application.name;
        application.description =
          updateApplicationDto.description || application.description;
        await this.entityManager.persistAndFlush(application);
      } catch (error) {
        throw new ErrorUpdatingAppException();
      }
      return {
        message: 'Successfully update',
        status: 200,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
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
      const application = await this.entityManager
        .getRepository(Application)
        .findOne(id);
      if (!application) {
        throw new NotFoundException('app not found');
      }
      try {
        await this.entityManager.getRepository(Application).nativeDelete(id);
      } catch (error) {
        throw new ErrorDeletingAppException();
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
