import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloWorldController } from './hello-world/hello-world.controller';

@Module({
  imports: [],
  controllers: [AppController, HelloWorldController],
  providers: [AppService],
})
export class AppModule {}
