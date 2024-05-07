import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to add custom headers to all responses.
 */
@Injectable()
export class HeaderMiddleware implements NestMiddleware {
  /**
   * Middleware handler that adds custom headers and modifies existing ones.
   *
   * @param req The Express Request object.
   * @param res The Express Response object.
   * @param next Function to pass the request to the next middleware in the chain.
   */
  use(req: Request, res: Response, next: NextFunction): void {
    // Add the custom header X-Version to all responses
    res.setHeader('X-Version', '1.0');

    // Remove the x-powered-by header to hide information about the technology being used
    res.removeHeader('x-powered-by');

    next();
  }
}
