import { describe, it, expect } from 'vitest';
import { AuthCredentialsDto } from './auth.dto';

describe('AuthDto', () => {
  it('should be defined', () => {
    expect(AuthCredentialsDto).toBeDefined();
  });
});
