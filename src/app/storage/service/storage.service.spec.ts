import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
