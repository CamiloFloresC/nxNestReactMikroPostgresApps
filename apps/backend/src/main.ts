import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { generateOpenAPI } from './scripts/generate-openAPI';
import { generateClient } from './scripts/generate-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // globalprefix
  app.setGlobalPrefix('api');

  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('monorepo nx Nestjs React Mikro-orm postgres')
    .setDescription('The crud API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('nx nests react Mikro orm Postgres')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // generate file openApi.json
  if (process.argv.find((arg) => arg === '--generate-openapi')) {
    await generateOpenAPI(app, document);
  }

  // generate client typescript and C#
  if (process.argv.find((arg) => arg === '--generate-client')) {
    await generateClient();
  }

  // cors config
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
  };
  app.enableCors(corsOptions);

  SwaggerModule.setup('api', app, document);

  // mikro orm
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();

  await app.listen(3000);
}
bootstrap();
