import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Elloow API')
    .setDescription('Elloow API documentation')
    .setVersion('v0.1')
    .addTag('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Elloow API documentation',
    customfavIcon: null,
  });

  await app.listen(3333, '0.0.0.0');
  console.info(`Application is running on : ${await app.getUrl()}`);
}
bootstrap();
