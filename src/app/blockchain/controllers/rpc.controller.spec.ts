import { Test, TestingModule } from '@nestjs/testing';
import { RpcController } from './rpc.controller';
import { beforeEach, it, expect, describe } from 'vitest';
import { RpcService } from '../services/rpc.service';

describe('RpcController', () => {
  let controller: RpcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RpcController],
      providers: [RpcService],
    }).compile();

    controller = module.get<RpcController>(RpcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
