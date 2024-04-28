import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async authUser(
    username: string,
    password: string,
  ): Promise<{ token: string; expiresIn: number }> {
    const token = this.generateToken(username, password);
    let expiresIn = this.jwtService.decode(token)['exp']; // Obtiene el tiempo de expiración del token
    expiresIn = new Date(expiresIn * 1000).toLocaleTimeString();
    return { token, expiresIn };
  }

  private generateToken(username: string, password: string): string {
    // Generar un token JWT con el nombre de usuario como carga útil
    const payload = { username, password };
    return this.jwtService.sign(payload);
  }
}
