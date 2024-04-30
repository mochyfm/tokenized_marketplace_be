import { Test, TestingModule } from '@nestjs/testing';
import { AuthMiddleware } from './auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Logger } from '@nestjs/common';
import { BKND_CONSTANTS } from 'src/constants/backend.constants';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vitest,
} from 'vitest';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let jwtServiceMock: JwtService;
  let loggerSpy: MockInstance;
  const verifyMock = vitest.fn();

  beforeEach(async () => {
    verifyMock.mockClear();
    jwtServiceMock = {
      verify: verifyMock,
    } as any;

    loggerSpy = vitest.spyOn(Logger.prototype, 'log');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthMiddleware,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    middleware = module.get<AuthMiddleware>(AuthMiddleware);
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    it('should call next() if route is excluded', () => {
      // Arrange
      const req = { baseUrl: BKND_CONSTANTS.excludedRoutes[0], headers: [] };
      const res = {};
      const next = vitest.fn();
      // Act
      middleware.use(req, res, next);

      // Assert
      expect(next).toHaveBeenCalled();
      expect(loggerSpy).toHaveBeenCalledWith(
        `The IP: undefined attempted to connect`,
      );
    });

    it('should call next() if token is provided and valid', () => {
      // Arrange
      const token = 'validToken';
      const req = { headers: { 'x-auth-token': token }, ip: '127.0.0.1' };
      const res = { status: vitest.fn().mockReturnThis(), json: vitest.fn() };
      const next = vitest.fn();
      verifyMock.mockReturnValueOnce({ username: 'testUser' });

      // Act
      middleware.use(req, res, next);

      // Assert
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(loggerSpy).toHaveBeenCalledWith(
        `The IP: 127.0.0.1 attempted to connect`,
      );
      expect(loggerSpy).toHaveBeenCalledWith(`User: testUser, IP: 127.0.0.1`);
    });

    it('should return UNAUTHORIZED status if token is not provided', () => {
      // Arrange
      const req = { headers: {}, ip: '127.0.0.1' };
      const res = { status: vitest.fn().mockReturnThis(), json: vitest.fn() };
      const next = vitest.fn();

      // Act
      middleware.use(req, res, next);

      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token not provided' });
      expect(loggerSpy).toHaveBeenCalledWith(
        `The IP: 127.0.0.1 attempted to connect`,
      );
    });

    it('should return UNAUTHORIZED status if token is invalid', () => {
      // Arrange
      const token = 'invalidToken';
      const req = { headers: { 'x-auth-token': token }, ip: '127.0.0.1' };
      const res = { status: vitest.fn().mockReturnThis(), json: vitest.fn() };
      const next = vitest.fn();
      verifyMock.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act
      middleware.use(req, res, next);

      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    });
  });
});
