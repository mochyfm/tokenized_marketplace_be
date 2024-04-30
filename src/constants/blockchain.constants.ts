import { config } from 'dotenv';

// Load environment variables from a .env file
config();

/**
 * Constants related to blockchain.
 */
export const BLK_CONSTANTS = {
  rpcProviderProtocol: process.env.RPC_PROV_PROTOCOL || 'http',
  /**
   * The IP address of the RPC provider (NOT THE NAME RESOLUTION).
   * Defaults to 'localhost' if not provided in the environment variables.
   */
  rpcProviderIp: process.env.RPC_PROV_IP || '127.0.0.1',

  /**
   * The port of the RPC provider.
   * Defaults to 8545 if not provided in the environment variables.
   */
  rpcProviderPort: process.env.RPC_PROV_PORT || 8545,
};
