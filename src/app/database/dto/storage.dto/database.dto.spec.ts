import { DatabaseDto } from './database.dto';
import { describe, it, expect } from 'vitest';

describe('StorageDto', () => {
  it('should be defined', () => {
    expect(new DatabaseDto()).toBeDefined();
  });
});
