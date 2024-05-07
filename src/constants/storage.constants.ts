import { config } from 'dotenv';

// Load environment variables from .env file.
config();

/**
 * Constants related to storage configuration.
 */
export const STORG_CONSTANTS = {
  /**
   * Hostname of the MongoDB server. (Default: localhost)
   * Example in .env: HOST=your_host
   */
  host: process.env.STORAGE_HOST || 'localhost',

  /**
   * Name of the element to connect to, meaning this a database, table... (Default: tokenized_marketplace)
   */
  name: process.env.DB_NAME || 'tokenized_marketplace',

  /**
   * Port of the MongoDB container. (Default: 27017)
   * Example in .env: CONTAINER_PORT=27017
   */
  port: parseInt(process.env.STORAGE_PORT, 10) || 27017,

  /**
   * Username for authentication. (Default: enpower)
   */
  username: process.env.DB_USERNAME || 'enpower',

  /**
   * Password for authentication. (Default: Test1234!)
   */
  password: process.env.DB_PASSWORD || 'Test1234!',

  /**
   * Array of entities to be used for database mapping.
   */
  entities: [],

  /**
   * Indicates whether to automatically synchronize database schema with entities. (Default: true)
   */
  synchronize: true,
};
