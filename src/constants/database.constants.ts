import { config } from 'dotenv';

// Load environment variables from .env file.
config();

/**
 * Constants related to storage configuration.
 */
export const DATABSE_CONSTANTS = {
  /**
   * Hostname of the database server. (Default: localhost)
   * Example in .env: DB_HOST=your_host
   */
  host: process.env.DB_HOST || 'localhost',

  /**
   * Name of the element to connect to, meaning this a database, table... (Default: tokenized_marketplace)
   */
  name: process.env.DB_NAME || 'tokenized_marketplace',

  /**
   * Port of the MongoDB container. (Default: 27017)
   * Example in .env: DB_PORT=27017
   */
  port: parseInt(process.env.DB_PORT, 10) || 27017,

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
