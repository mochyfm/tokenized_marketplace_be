import { config } from 'dotenv';

config();

/**
 * Constants related to JWT authentication.
 */
export const JWT_CONSTANTS = {
  /**
   * JWT expiration time (in seconds).
   * If not provided in the environment variables, '1 hour' is used as the default value.
   */
  expirationTime: parseInt(process.env.JWT_EXPIRATION_TIME) || 3600,

  /**
   * Environment attribute name for JWT secret.
   */
  jwtSecretEnvVariable: 'JWT_SECRET',
};
