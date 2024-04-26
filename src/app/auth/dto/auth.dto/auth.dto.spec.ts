import { AuthDto } from './auth.dto';
import { describe, it, expect } from 'vitest';

describe('AuthDto', () => {
  it('should be defined', () => {
    expect(new AuthDto()).toBeDefined();
  });
});
