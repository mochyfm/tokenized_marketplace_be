import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

/**
 * Constants for the backend.
 */
export const BKND_CONSTANTS = {
  /**
   * Swagger endpoint.
   * If not provided in the environment variables, 'swagger-dev' is used as the default value.
   */
  swaggerEndpoint: `${process.env.SWAGGER_ENDPOINT}` || 'swagger-dev',

  /**
   * Backend IP address.
   * If not provided in the environment variables, '127.0.0.1' is used as the default value.
   */
  backendIp: `${process.env.BACKEND_IP}` || '127.0.0.1',

  /**
   * Backend port.
   * If not provided in the environment variables, 7543 is used as the default value.
   */
  backendPort: parseInt(process.env.BACKEND_PORT) || 7543,

  /**
   * Backend .env file path
   * This is the path to the .env file
   */
  envFilePath: '.env',
};
