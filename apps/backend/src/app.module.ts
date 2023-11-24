import { Module } from '@nestjs/common';
import { ApplicationModule } from './modules/application/application.module';
import { DatabaseModule } from './database/database.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [ApplicationModule, DatabaseModule, GroupModule],
})
export class AppModule {}
