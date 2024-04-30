import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/constants/security.constants';
import { beforeEach, describe, expect, it, vitest } from 'vitest';

/**
 * Test suite for the AuthService class.
 */
describe('AuthService', () => {
  let service: AuthService; // Instance of AuthService
  let jwtServiceMock: JwtService; // Mocked JwtService instance

  /**
   * Setup function to initialize the test environment before each test case.
   */
  beforeEach(async () => {
    // Mock JwtService methods
    jwtServiceMock = {
      sign: vitest.fn(), // Mocked sign method
      verify: vitest.fn(), // Mocked verify method
      decode: vitest.fn(), // Mocked decode method
    } as any;

    // Create a testing module with AuthService and mocked JwtService
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    // Get an instance of AuthService from the testing module
    service = module.get<AuthService>(AuthService);
  });

  /**
   * Test case to verify that the AuthService is defined.
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Test suite for the authUser method.
   */
  describe('authUser', () => {
    /**
     * Test case to verify that the authUser method generates a token and returns its expiration time.
     */
    it('should generate a token and return its expiration time', async () => {
      // Arrange
      const username = 'testUser';
      const password = 'testPassword';
      const token = 'testToken';
      const expiresIn = 3600; // 1 hour in seconds

      // Mock the sign method to return a token
      vitest.spyOn(jwtServiceMock, 'sign').mockReturnValue(token);
      // Mock the decode method to return the expiration time
      vitest
        .spyOn(jwtServiceMock, 'decode')
        .mockReturnValue({ exp: expiresIn });

      // Act
      const result = await service.authUser(username, password);

      // Assert
      expect(result).toEqual({ token, expiresIn });
      // Verify that the sign method was called with the expected parameters
      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
        { username, password },
        { expiresIn: JWT_CONSTANTS.expirationTime },
      );
    });
  });

  /**
   * Test suite for the verifyToken method.
   */
  describe('verifyToken', () => {
    /**
     * Test case to verify that the verifyToken method verifies the token and returns its status.
     */
    it('should verify the token and return its status', async () => {
      // Arrange
      const token = 'testToken';
      const decodedToken = { exp: Math.floor(Date.now() / 1000) + 3600 }; // Expires in 1 hour
      const remainingTime = 3600; // 1 hour in seconds

      // Mock the verify method to return a decoded token
      vitest.spyOn(jwtServiceMock, 'verify').mockReturnValue(decodedToken);

      // Act
      const result = await service.verifyToken(token);

      // Assert
      expect(result).toEqual({ isValid: true, expiresIn: remainingTime });
      // Verify that the verify method was called with the expected token
      expect(jwtServiceMock.verify).toHaveBeenCalledWith(token);
    });

    /**
     * Test case to verify that the verifyToken method handles verification errors and returns invalid status.
     */
    it('should handle verification error and return invalid status', async () => {
      // Arrange
      const token = 'invalidToken';

      // Mock the verify method to throw an error
      vitest.spyOn(jwtServiceMock, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act
      const result = await service.verifyToken(token);

      // Assert
      expect(result).toEqual({ isValid: false, expiresIn: null });
      // Verify that the verify method was called with the expected token
      expect(jwtServiceMock.verify).toHaveBeenCalledWith(token);
    });
  });
});
