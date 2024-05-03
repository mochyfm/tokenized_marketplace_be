import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BKND_CONSTANTS } from './constants/backend.constants';
import { Logger } from '@nestjs/common';
import { ensureJwtSecretInEnv } from './utils/security.tools';
import { config } from 'dotenv';
import { DockerService } from './config/docker.setup';

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
  const dockerService = new DockerService();

  // Start the Docker container
  await dockerService.startContainer();

  // Wait for the Docker container to be ready
  const waitForContainer = async () => {
    while (true) {
      if (await dockerService.isContainerRunning()) {
        logger.log('Docker container is ready.');
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    }
  };

  await waitForContainer();

  process.on('SIGINT', async () => {
    logger.verbose('Received SIGINT. Stopping Docker container and exiting...');

    // Stop the Docker container before exiting
    await dockerService.stopContainer();

    // Exit the Node.js process
    process.exit();
  });

  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    // Start listening on the specified port
    await app.listen(BKND_CONSTANTS.backendPort);

    // Check if Swagger is enabled
    if (BKND_CONSTANTS.swagger) {
      AppModule.configureSwagger(app);
    }

    // Get the URL where the server is running
    const address = await app.getUrl();

    // Log server running information
    Logger.log(`Server running on ${address}`, 'Bootstrap');
  } catch (error) {
    logger.error('Error starting the application:', error);
    await dockerService.stopContainer();
    process.exit(1);
  }
}

bootstrap();
