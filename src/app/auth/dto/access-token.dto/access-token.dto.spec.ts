import { describe, it, expect } from 'vitest';
import { AccessTokenDto } from './access-token.dto';

describe('AuthDto', () => {
  it('should be defined', () => {
    expect(new AccessTokenDto()).toBeDefined();
  });
});
