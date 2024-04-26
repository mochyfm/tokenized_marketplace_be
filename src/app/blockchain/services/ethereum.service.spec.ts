import { Test, TestingModule } from '@nestjs/testing';
import { EthereumService } from './ethereum.service';
import { beforeEach, it, expect, describe } from 'vitest';

describe('EthereumService', () => {
  let service: EthereumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EthereumService],
    }).compile();

    service = module.get<EthereumService>(EthereumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
