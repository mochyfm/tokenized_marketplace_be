import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BKND_CONSTANTS } from './constants/backend.constants';
import { Logger } from '@nestjs/common';
import { ensureJwtSecretInEnv } from './utils/security.tools';
import { config } from 'dotenv';

config();
ensureJwtSecretInEnv();

/**
 * Bootstrap the application.
 *
 * This function initializes the NestJS application instance,
 * configures Swagger documentation if enabled, and starts
 * listening on the specified port.
 */
async function bootstrap(): Promise<void> {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Check if Swagger is enabled
  if (BKND_CONSTANTS.swagger) {
    AppModule.configureSwagger(app);
  }

  console.log(BKND_CONSTANTS.excludedRoutes);

  // Start listening on the specified port
  await app.listen(BKND_CONSTANTS.backendPort);

  // Get the URL where the server is running
  const address = await app.getUrl();

  // Log server running information
  Logger.log(`Server running on ${address}`, 'Bootstrap');
}

bootstrap();
