import { Module } from '@nestjs/common';
import { ApplicationModule } from './modules/application/application.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ApplicationModule, DatabaseModule],
})
export class AppModule {}
