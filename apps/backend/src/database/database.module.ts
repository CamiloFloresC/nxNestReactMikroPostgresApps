import { MikroOrmModule, logger } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Application } from '../modules/application/entities/application.entity';
import { Group } from '../modules/group/entities/group.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot({
      entities: [Application, Group],
      type: 'postgresql',
      port: 5432,
      user: process.env.USER_DB,
      password: process.env.PASSWORD,
      dbName: process.env.POSTGRES_DB,
      debug: true,
      logger: logger.log.bind(logger),
      persistOnCreate: true,
    }),
  ],
})
export class DatabaseModule {}