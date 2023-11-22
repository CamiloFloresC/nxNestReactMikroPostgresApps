import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import path from 'path';

export const generateOpenAPI = async (
  app: INestApplication,
  document: OpenAPIObject
) => {
  try {
    const outputPath = path.resolve(
      process.cwd(),
      './apps/backend/openApi.json'
    );
    writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8' });
    await app.close();
    console.log('🚀 openApi generated successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error generating OpenAPI: ${error.message}`);
    process.exit(1);
  }
};
