import { Test, TestingModule } from '@nestjs/testing';
import { RpcService } from './rpc.service';
import { beforeEach, it, expect, describe } from 'vitest';

describe('EthereumService', () => {
  let service: RpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpcService],
    }).compile();

    service = module.get<RpcService>(RpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
