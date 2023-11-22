import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Group } from './entities/group.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
