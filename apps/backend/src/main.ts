import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import path from 'path';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  const config = new DocumentBuilder()
    .setTitle('crud example')
    .setDescription('The crud API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('crud Application Mikro orm Postgres')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // generate file openApi.json
  if (process.argv.find((arg) => arg === '--generate-openapi')) {
    const outputPath = path.resolve(
      process.cwd(),
      './apps/nestjs-mikro-postgres/openApi.json'
    );
    writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8' });
    await app.close();
    console.log('🚀 openApi generated successfully!');
    process.exit(0);
  }
  // generate client typescript and C#
  if (process.argv.find((arg) => arg === '--generate-client')) {
    try {
      execSync(
        'npx openapi-generator-cli generate -i apps/nestjs-mikro-postgres/openapi.json -g csharp -o libs/clients/nestjs-mikro-postgres-client-csharp'
      );
      execSync(
        'npx openapi-generator-cli generate -i apps/nestjs-mikro-postgres/openapi.json -g typescript-fetch -o libs/clients/nestjs-mikro-postgres-client-typescript'
      );
      Logger.log('🚀 TypeScript and C# client generated successfully!');
      process.exit();
    } catch (error) {
      Logger.error(
        `❌ Error generating TypeScript and C# client: ${error.message}`
      );
      process.exit();
    }
  }
  SwaggerModule.setup('api', app, document);
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();
  await app.listen(3000);
}
bootstrap();
