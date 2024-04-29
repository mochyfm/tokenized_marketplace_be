import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './auth.middleware';
import { describe, it, expect } from 'vitest';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware(new JwtService())).toBeDefined();
  });
});
