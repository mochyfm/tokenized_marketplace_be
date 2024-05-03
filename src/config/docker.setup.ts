import Dockerode = require('dockerode');
import { Logger } from '@nestjs/common';
import { DOCKR_CONSTANTS } from '../constants/docker.constants';

const docker = new Dockerode();
const logger = new Logger('DockerService');

const dockerConfig: Dockerode.ContainerCreateOptions = {
  Image: DOCKR_CONSTANTS.containerImage,
  name: DOCKR_CONSTANTS.containerName,
  ExposedPorts: { [`${DOCKR_CONSTANTS.containerPort}/tcp`]: {} },
  Env: DOCKR_CONSTANTS.envVariables,
  HostConfig: {
    PortBindings: {
      [`${DOCKR_CONSTANTS.containerPort}/tcp`]: [
        { HostPort: `${DOCKR_CONSTANTS.containerPort}` },
      ],
    },
  },
};

export class DockerService {
  private isCreatingContainer = false; // Flag to prevent concurrent container creation

  async startContainer() {
    try {
      logger.log('Checking docker container state...');
      // Check if the container already exists
      const existingContainer = docker.getContainer(
        DOCKR_CONSTANTS.containerName,
      );
      const containerInfo = await existingContainer.inspect();

      // If the container exists and is running, log a message and return
      if (containerInfo.State.Running) {
        logger.verbose(
          `${DOCKR_CONSTANTS.containerName} container is already running on port ${DOCKR_CONSTANTS.containerPort}`,
        );
        return;
      }

      // If the container exists but is not running, start it
      logger.log(
        `Container ${DOCKR_CONSTANTS.containerName} does already exist. Starting...`,
      );

      // Check if another process is already creating the container
      if (!this.isCreatingContainer) {
        this.isCreatingContainer = true;

        // Start the container if it's not already running
        await existingContainer.start();
        logger.log(
          `${DOCKR_CONSTANTS.containerName} container started on port ${DOCKR_CONSTANTS.containerPort}`,
        );

        this.isCreatingContainer = false; // Release the lock after starting the container
      }
    } catch (dockerError) {
      // If the container doesn't exist, create and start a new one
      if (dockerError.statusCode === 404) {
        logger.log('Creating container');
        try {
          // Check if image exists locally, if not, pull the image
          const imageExists = await this.doesImageExistsLocally(
            DOCKR_CONSTANTS.containerImage,
          );
          if (!imageExists) {
            logger.log(
              `Image ${DOCKR_CONSTANTS.containerImage} not found locally. Pulling image...`,
            );
            await docker.pull(DOCKR_CONSTANTS.containerImage);
            logger.log(
              `Image ${DOCKR_CONSTANTS.containerImage} pulled successfully.`,
            );
          }
          await (await docker.createContainer(dockerConfig)).start();
          logger.log(
            `${DOCKR_CONSTANTS.containerName} container started on port ${DOCKR_CONSTANTS.containerPort}`,
          );
        } catch (startError) {
          logger.error(
            `Error starting container ${DOCKR_CONSTANTS.containerName}:`,
            startError,
          );
        }
      } else {
        logger.error(
          `Error checking container ${DOCKR_CONSTANTS.containerName} : `,
          dockerError,
        );
      }
    }
  }

  async restartContainer() {
    try {
      const container = docker.getContainer(DOCKR_CONSTANTS.containerName);
      const containerInfo = await container.inspect();

      if (!containerInfo.State.Running) {
        // Re-Launch and check container status
        await container.start();
        logger.verbose('Container restarted. ');
        const isRunning = await this.isContainerRunning();
        return isRunning;
      }
      return true;
    } catch (dockerError) {
      logger.error(
        `Error restarting container ${DOCKR_CONSTANTS.containerName}: `,
        dockerError,
      );
      return false;
    }
  }

  async stopContainer() {
    try {
      const container = docker.getContainer(DOCKR_CONSTANTS.containerName);
      await container.stop();
      logger.log(`${DOCKR_CONSTANTS.containerName} container stopped`);
    } catch (dockerError) {
      logger.error(dockerError);
    }
  }

  async isContainerRunning() {
    try {
      const containers = await docker.listContainers();
      const isRunning = containers.some(
        (container) =>
          container.Names.includes(`/${DOCKR_CONSTANTS.containerName}`) &&
          container.State === 'running',
      );
      return isRunning;
    } catch (dockerError) {
      logger.error(
        `Error checking the status of the ${DOCKR_CONSTANTS.containerName} container:`,
        dockerError,
      );
      return false;
    }
  }

  async doesContainerExist() {
    try {
      const container = docker.getContainer(DOCKR_CONSTANTS.containerName);
      await container.inspect();
      return true;
    } catch (dockerError) {
      if (dockerError.statusCode === 404) {
        return false;
      }
      logger.error(
        `Error checking the status of the ${DOCKR_CONSTANTS.containerName} container:`,
        dockerError,
      );
      return false;
    }
  }

  async doesImageExistsLocally(imageName: string): Promise<boolean> {
    try {
      const images = await docker.listImages();
      return images.some((image) => image.RepoTags.includes(imageName));
    } catch (error) {
      logger.error(`Error checking local images: `, error);
      return false;
    }
  }
}
