import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from '../dto/auth.dto/auth.dto';
import { AccessTokenDto } from '../dto/access-token.dto/access-token.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para autenticar a un usuario basado en las credenciales proporcionadas.
   * @param credentials Las credenciales de autenticación proporcionadas por el usuario.
   * @returns Un objeto que contiene un token de acceso si la autenticación es exitosa.
   */
  @Post('auth')
  @ApiOperation({
    summary: 'Authenticates a user based on the credentials provided',
    requestBody: {
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/AuthCredentialsDto' }, // Referencia al esquema de DTO para las credenciales de autenticación
          example: { username: 'John', password: 'Doe' }, // Ejemplo del cuerpo de la solicitud
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    isArray: false,
    type: AccessTokenDto, // Tipo de datos de la respuesta
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/AccessTokenDto' }, // Referencia al esquema de DTO para el token de acceso
        example: { access_token: '1234' }, // Ejemplo de respuesta con el token de acceso
      },
    },
  })
  async authUser(
    @Body() credentials: AuthCredentialsDto,
  ): Promise<AccessTokenDto> {
    const { username, password } = credentials;
    const { token, expiresIn } = await this.authService.authUser(
      username,
      password,
    );
    return { access_token: token, expires_in: expiresIn };
  }
}
