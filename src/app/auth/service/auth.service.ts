import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenStatusDto } from '../dto/token-status.dto/token-status.dto';
import { JWT_CONSTANTS } from 'src/constants/security.constants';

/**
 * Service responsible for authentication related operations.
 */
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Authenticates a user and generates a JWT token.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<{ token: string; expiresIn: number }>} An object containing the generated token and its expiration time.
   */
  async authUser(
    username: string,
    password: string,
  ): Promise<{ token: string; expiresIn: number }> {
    // Generate token using provided username and password
    const token = this.generateToken(username, password);
    // Decode the token to get its expiration time
    const expiresIn = this.jwtService.decode(token)['exp'];
    return { token, expiresIn };
  }

  /**
   * Verifies the validity of a JWT token.
   * @param {string} token - The JWT token to be verified.
   * @returns {Promise<TokenStatusDto>} An object indicating whether the token is valid and its remaining lifespan.
   */
  async verifyToken(token: string): Promise<TokenStatusDto> {
    try {
      // Verify the token
      const decodedToken = this.jwtService.verify(token);
      // Calculate remaining time based on token's expiration time
      const remainingTime = decodedToken.exp - Math.floor(Date.now() / 1000);
      return { isValid: remainingTime > 0, expiresIn: remainingTime };
    } catch (error) {
      // If verification fails, return an invalid token status
      return { isValid: false, expiresIn: null };
    }
  }

  /**
   * Generates a JWT token using the provided username and password.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {string} The generated JWT token.
   */
  private generateToken(username: string, password: string): string {
    const payload = { username, password };
    // Sign the payload to generate the token
    return this.jwtService.sign(payload, {
      expiresIn: JWT_CONSTANTS.expirationTime,
    });
  }
}
