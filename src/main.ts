import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BKND_CONSTANTS } from './constants/backend.constants';
import { Logger } from '@nestjs/common';
import { ensureJwtSecretInEnv } from './utils/security.tools';

ensureJwtSecretInEnv();

// Function to bootstrap the application
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Configure Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Blockchain Marketplace API') // API title
    .setDescription('A decentralized marketplace demo') // API description
    .addServer(
      `http://${BKND_CONSTANTS.backendIp}:${BKND_CONSTANTS.backendPort}`,
      'Local env',
    )
    .setVersion('1.0') // API version
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup(BKND_CONSTANTS.swaggerEndpoint, app, document);

  // Start listening on the specified port
  await app.listen(BKND_CONSTANTS.backendPort);

  // Get the URL where the server is running
  const address = await app.getUrl();

  // Log server running information
  Logger.log(`Server running on ${address}`, 'Bootstrap');
}

// Bootstrap the application
bootstrap();
