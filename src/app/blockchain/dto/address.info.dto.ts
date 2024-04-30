import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO to store relevant information about an Ethereum address.
 */
export class AddressInfoDto {
  /**
   * Ethereum address.
   */
  @ApiProperty({ description: 'Ethereum address' })
  address: string;

  /**
   * Balance in Ether of the address.
   */
  @ApiProperty({ description: 'Balance in Ether' })
  balance: string;

  /**
   * Number of transactions sent from this address.
   */
  @ApiProperty({ description: 'Number of transactions sent from this address' })
  transactionCount: number;

  /**
   * Nonce of the address.
   */
  @ApiProperty({ description: 'Nonce of the address' })
  nonce?: number;
}
