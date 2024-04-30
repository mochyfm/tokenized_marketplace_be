import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO representing information about the RPC status and other relevant data.
 */
export class RpcInfoDto {
  /**
   * RPC address along with its port.
   * Example: 'http://localhost:8545'
   */
  @ApiProperty({
    description: 'RPC address along with its port',
    example: 'http://localhost:8545',
  })
  rpcUrl: string;

  /**
   * Current block number in the blockchain.
   */
  @ApiProperty({
    description: 'Current block number in the blockchain',
  })
  currentBlockNumber: number;

  /**
   * Indicator of whether the RPC is active or not.
   */
  @ApiProperty({
    description: 'Indicator of whether the RPC is active or not',
  })
  rpcActive: boolean;

  /**
   * Version of the RPC provider.
   */
  @ApiProperty({
    description: 'Version of the RPC provider',
    required: false,
  })
  rpcVersion?: string;

  /**
   * URL of the RPC provider.
   */
  @ApiProperty({
    description: 'URL of the RPC provider',
    required: false,
  })
  rpcProviderUrl?: string;

  /**
   * Description of the RPC provider.
   */
  @ApiProperty({
    description: 'Description of the RPC provider',
    required: false,
  })
  rpcProviderDescription?: string;

  /**
   * Number of peers connected to the RPC provider.
   */
  @ApiProperty({
    description: 'Number of peers connected to the RPC provider',
    required: false,
  })
  connectedPeers?: number;
}
