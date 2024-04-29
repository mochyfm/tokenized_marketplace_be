import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { BKND_CONSTANTS } from 'src/constants/backend.constants';

/**
 * Middleware para la autenticación de usuarios.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  /**
   * Función de middleware para manejar la autenticación.
   * @param req Objeto de solicitud HTTP.
   * @param res Objeto de respuesta HTTP.
   * @param next Función para pasar el control al siguiente middleware.
   */
  use(req: any, res: any, next: NextFunction) {
    const token = req.headers['x-auth-token'];
    this.logger.log(`The IP: ${req.ip} attempted to connect`);

    if (this.isExcludedRoute(req)) {
      next();
    } else if (token) {
      try {
        const decoded = this.jwtService.verify(token, {
          ignoreExpiration: false,
        });
        req.user = decoded;
        req.baseUrl = '/authed' + req.baseUrl;
        this.logger.log(`Usuario: ${decoded.username}, IP: ${req.ip}`);
        next();
      } catch (error) {
        res.status(HttpStatus.UNAUTHORIZED).json({ mensaje: 'Token inválido' });
      }
    } else {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ mensaje: 'Token no proporcionado' });
    }
  }

  /**
   * Verifica si la ruta está excluida de la autenticación.
   * @param req Objeto de solicitud HTTP.
   * @returns true si la ruta está excluida, false de lo contrario.
   */
  private isExcludedRoute(req: any): boolean {
    return BKND_CONSTANTS.excludedRoutes.includes(req.baseUrl);
  }
}
