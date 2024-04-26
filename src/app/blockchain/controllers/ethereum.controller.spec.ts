import { Test, TestingModule } from '@nestjs/testing';
import { EthereumController } from './ethereum.controller';
import { beforeEach, it, expect, describe } from 'vitest';

describe('EthereumController', () => {
  let controller: EthereumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EthereumController],
    }).compile();

    controller = module.get<EthereumController>(EthereumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
