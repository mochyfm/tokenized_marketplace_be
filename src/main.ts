import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BKND_CONSTANTS } from './constants/backend.constants';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { ensureJwtSecretInEnv } from './utils/security.tools';

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
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    app.getHttpAdapter().getInstance().set('etag', false);

    // Check if Swagger is enabled
    if (BKND_CONSTANTS.swagger) {
      AppModule.configureSwagger(app);
    }

    // Start listening on the specified port
    await app.listen(BKND_CONSTANTS.backendPort);

    // Get the URL where the server is running
    const address = await app.getUrl();

    // Log server running information
    logger.log(`Server running on ${address}`);
  } catch (error) {
    logger.error('Error starting the application:', error);
    process.exit(1);
  }
}

bootstrap();
