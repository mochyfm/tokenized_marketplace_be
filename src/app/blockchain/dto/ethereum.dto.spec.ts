import { EthereumDto } from './ethereum.dto';
import { it, expect, describe } from 'vitest';

describe('EthereumDto', () => {
  it('should be defined', () => {
    expect(new EthereumDto()).toBeDefined();
  });
});
