import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DOCKR_CONSTANTS } from './docker.constants';
import { DatabaseType } from 'typeorm';

// Load environment variables from .env file.
config();

/**
 * Constants related to storage configuration.
 */
export const STORG_CONSTANTS = {
  /**
   * TypeORM options for creating a DB connection.
   */
  typeOrmOptions: {
    /**
     * Type of the database. (Default: mongodb)
     * Example in .env: TYPE=mongodb
     */
    type: (process.env.ORM_TYPE as DatabaseType) || 'sqlite',

    /**
     * Hostname of the MongoDB server. (Default: localhost)
     * Example in .env: HOST=your_host
     */
    host: process.env.DB_HOST || DOCKR_CONSTANTS.host,

    /**
     * Port of the MongoDB container. (Default: 27017)
     * Example in .env: CONTAINER_PORT=27017
     */
    port: process.env.DB_PORT
      ? parseInt(process.env.DB_PORT, 10)
      : DOCKR_CONSTANTS.containerPort || 27017,

    /**
     * Username for authentication. (Default: enpower)
     */
    username: process.env.DB_USERNAME || 'enpower',

    /**
     * Password for authentication. (Default: Test1234!)
     */
    password: process.env.DB_PASSWORD || 'Test1234!',

    /**
     * Name of the database to connect to. (Default: tokenized_marketplace)
     */
    database: process.env.DB_NAME || 'tokenized_marketplace',

    /**
     * Array of entities to be used for database mapping.
     */
    entities: [],

    /**
     * Indicates whether to automatically synchronize database schema with entities. (Default: true)
     */
    synchronize: true,
  } as TypeOrmModuleOptions, // Type assertion for TypeORM options
};
