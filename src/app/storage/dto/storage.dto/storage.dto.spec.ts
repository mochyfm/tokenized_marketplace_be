import { StorageDto } from './storage.dto';
import { describe, it, expect } from 'vitest';

describe('StorageDto', () => {
  it('should be defined', () => {
    expect(new StorageDto()).toBeDefined();
  });
});
