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

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly appRepository: EntityRepository<Application>,
    private readonly em: EntityManager
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
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

      await this.em.persist(create).flush();

      return {
        message: 'Successfully created',
        status: 201,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      const applications = await this.appRepository.findAll();
      if (!applications) {
        throw new NotFoundException('List of apps not found');
      }
      return applications;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const application = await this.appRepository.findOne(id);
      if (!application) {
        throw new NotFoundException('app not found');
      }
      return application;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    try {
      this.appRepository.nativeUpdate(id, {
        description: updateApplicationDto.description,
        name: updateApplicationDto.name,
        client_id: updateApplicationDto.client_id,
      });
      return this.appRepository.findOne(id);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.em.getRepository(Application).nativeDelete(id);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
