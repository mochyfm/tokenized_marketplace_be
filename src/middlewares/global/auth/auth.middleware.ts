import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { BKND_CONSTANTS } from 'src/constants/backend.constants';

/**
 * Middleware for user authentication.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  /**
   * Middleware function to handle authentication.
   * @param req HTTP request object.
   * @param res HTTP response object.
   * @param next Function to pass control to the next middleware.
   */
  use(req: any, res: any, next: NextFunction) {
    const token = req.headers['x-auth-token'];
    this.logger.log(`The IP: ${req.ip} attempted to connect`);
    if (this.isExcludedRoute(req)) {
      next();
    } else if (token) {
      this.logger.warn(`The token is: ${token.substring(0, 20)}...`);
      try {
        const decoded = this.jwtService.verify(token, {
          ignoreExpiration: false,
        });
        req.user = decoded;
        this.logger.log(`User: ${decoded.username}, IP: ${req.ip}`);
        next();
      } catch (error) {
        this.logger.error('ERROR: ' + error.message);
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
      }
    } else {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Token not provided' });
    }
  }

  /**
   * Checks if the route is excluded from authentication.
   * @param req HTTP request object.
   * @returns true if the route is excluded, false otherwise.
   */
  private isExcludedRoute(req: any): boolean {
    return BKND_CONSTANTS.excludedRoutes.includes(req.baseUrl);
  }
}
