import { config } from 'dotenv';

config();

/**
 * Constants for Docker-related configurations.
 */
export const DOCKR_CONSTANTS = {
  /**
   * Docker container image for MongoDB.
   */
  containerImage:
    process.env.CONTAINER_IMAGE || 'mongodb/mongodb-community-server:latest',

  /**
   * Name of the Docker container.
   */
  containerName: process.env.CONTAINER_NAME || 'MongoDB',

  /**
   * Port number exposed by the Docker container.
   */
  containerPort: process.env.CONTAINER_PORT
    ? parseInt(process.env.CONTAINER_PORT, 10)
    : 27017,

  /**
   * Hostname for the Docker container.
   */
  host: process.env.HOST || 'localhost',

  /**
   * Environment variables for the Docker container.
   */
  envVariables: [],

  /**
   * Timeout for Docker response in milliseconds. (Default: 5 seconds)
   */
  waitForResponseDockerTimeout: process.env.WAIT_FOR_RESPONSE_DOCKER_TIMEOUT
    ? parseInt(process.env.WAIT_FOR_RESPONSE_DOCKER_TIMEOUT, 10)
    : 5000,

  /**
   * Interval time for checking service status in milliseconds. (Default: 5 minutes)
   */
  statusCheckServiceIntervalTimeInterval: process.env
    .STATUS_CHECK_SERVICE_INTERVAL_TIME_INTERVAL
    ? parseInt(process.env.STATUS_CHECK_SERVICE_INTERVAL_TIME_INTERVAL, 10)
    : 300000,

  /**
   * Email domain used for users. (Default: localhost.net)
   */
  usersEmailDomain: process.env.USERS_EMAIL_DOMAIN || 'localhost.net',
};
