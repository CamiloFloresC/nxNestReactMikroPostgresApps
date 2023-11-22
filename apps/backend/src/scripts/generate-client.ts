import { execSync } from 'child_process';

export const generateClient = async () => {
  try {
    execSync(
      'npx openapi-generator-cli generate -i apps/backend/openapi.json -g csharp -o libs/clients/nestjs-mikro-postgres-client-csharp'
    );
    execSync(
      'npx openapi-generator-cli generate -i apps/backend/openapi.json -g typescript-fetch -o libs/clients/nestjs-mikro-postgres-client-typescript'
    );
    console.log('🚀 TypeScript and C# client generated successfully!');
    process.exit();
  } catch (error) {
    console.error(
      `❌ Error generating TypeScript and C# client: ${error.message}`
    );
    process.exit(1);
  }
};
