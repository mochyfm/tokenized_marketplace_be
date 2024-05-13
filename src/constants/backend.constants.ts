import { config } from 'dotenv';

config();

/**
 * Constants related to the global backend.
 */
export const BKND_CONSTANTS = {
  /**
   * Backend IP address.
   * If not provided in the environment variables, '127.0.0.1' is used as the default value.
   */
  backendIp: process.env.BACKEND_IP || '127.0.0.1',

  /**
   * Backend port.
   * If not provided in the environment variables, 7543 is used as the default value.
   */
  backendPort: parseInt(process.env.BACKEND_PORT) || 7543,

  /**
   * Backend .env file path
   * This is the path to the .env file
   * If not provided, defaults to the root directory ('.env' file in the same directory as the script).
   */
  envFilePath: process.env.ENV_FILE || '.env',

  /**
   * Swagger state.
   * Enables or not swagger. If not provided the swagger will be by default disabled.
   */
  swagger: process.env.SWAGGER === 'true' || false,

  /**
   * Swagger endpoint.
   * If not provided in the environment variables, 'swagger-dev' is used as the default value.
   */
  swaggerEndpoint: process.env.SWAGGER_ENDPOINT || 'swagger-dev',

  /**
   * Excluded routes for the Authentication Middleware.
   */
  excludedRoutes: ['/health', '/rpc/info'],
};
