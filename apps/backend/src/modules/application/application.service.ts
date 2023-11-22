import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entities/application.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { SuccessResponseDto } from '../../dto/success-response.dto';
import { GetApplicationDto } from './dto/get-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly appRepository: EntityRepository<Application>,
    private readonly em: EntityManager
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto
  ): Promise<SuccessResponseDto> {
    try {
      if (!createApplicationDto.client_id) {
        throw new BadRequestException('client_id is required');
      }

      if (!createApplicationDto.name) {
        throw new BadRequestException('name is required');
      }

      if (!createApplicationDto.description) {
        throw new BadRequestException('description is required');
      }
      const applicationverify = await this.appRepository.findOne({
        name: createApplicationDto.name,
      });
      if (applicationverify) {
        throw new ConflictException('This application already exists');
      }
      const create = this.appRepository.create(createApplicationDto);
      if (!create) {
        throw new BadRequestException('Error creating application');
      }

      try {
        await this.em.persist(create).flush();
      } catch (error) {
        throw new BadRequestException(error.message);
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
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<GetApplicationDto[]> {
    try {
      const applications = await this.appRepository.findAll();
      if (!applications) {
        throw new NotFoundException('List of apps not found');
      }
      return applications;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<GetApplicationDto> {
    try {
      const application = await this.appRepository.findOne(id);
      if (!application) {
        throw new NotFoundException('app not found');
      }
      return application;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async findOneByGroupId(idGroup: string): Promise<GetApplicationDto[]> {
    try {
      const applications = await this.appRepository.find({
        group: idGroup,
      });
      if (!applications) {
        throw new NotFoundException('List of apps not found');
      }
      return applications;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto
  ): Promise<SuccessResponseDto> {
    try {
      const application = await this.appRepository.findOne(id);
      if (!application) {
        throw new NotFoundException('app not found');
      }

      if (!updateApplicationDto.name) {
        throw new BadRequestException('name is required');
      }

      if (!updateApplicationDto.description) {
        throw new BadRequestException('description is required');
      }
      await this.appRepository.nativeUpdate(id, {
        description: updateApplicationDto.description,
        name: updateApplicationDto.name,
        updatedAt: new Date(),
      });
      return {
        message: 'Successfully update',
        status: 200,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
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
      const application = await this.appRepository.findOne(id);
      if (!application) {
        throw new NotFoundException('app not found');
      }
      await this.em.getRepository(Application).nativeDelete(id);
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

  async addGroup(
    idApplication: string,
    idGroup: string
  ): Promise<SuccessResponseDto> {
    try {
      const application = await this.appRepository.findOne(idApplication);
      if (!application) {
        throw new NotFoundException('app not found');
      }
      try {
        await this.appRepository.nativeUpdate(idApplication, {
          group: idGroup,
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      return {
        message: 'Successfully add Group',
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

  async deleteAppFromAGroup(
    idApplication: string,
    idGroup: string
  ): Promise<SuccessResponseDto> {
    try {
      const application = await this.appRepository.findOne(idApplication);
      if (!application) {
        throw new NotFoundException('app not found');
      }
      if (application.group === null) {
        throw new NotFoundException(
          'this application doesnot belong to a group'
        );
      }
      if (application.group.id != idGroup) {
        throw new NotFoundException(
          'this application does not belong to the group'
        );
      }
      try {
        await this.appRepository.nativeUpdate(idApplication, {
          group: null,
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      return {
        message: 'Successfully delete Group',
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
}
