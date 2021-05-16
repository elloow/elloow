import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloWorldController } from './api/hello-world/hello-world.controller';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database';

@Module({
  imports: [ConfigModule.forRoot(), databaseConfig],
  controllers: [AppController, HelloWorldController],
  providers: [AppService],
})
export class AppModule {}
