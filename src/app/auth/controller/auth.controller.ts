import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from '../dto/auth.dto/auth.dto';
import { AccessTokenDto } from '../dto/access-token.dto/access-token.dto';
import { TokenStatusDto } from '../dto/token-status.dto/token-status.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint to authenticate a user based on the provided credentials.
   * @param credentials The authentication credentials provided by the user.
   * @returns An object containing an access token if authentication is successful.
   */
  @Post('auth')
  @ApiOperation({
    summary: 'Authenticates a user based on the credentials provided',
    requestBody: {
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/AuthCredentialsDto' }, // Reference to the DTO schema for authentication credentials
          example: { username: 'John', password: 'Doe' }, // Example of the request body
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    isArray: false,
    type: AccessTokenDto, // Response data type
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/AccessTokenDto' }, // Reference to the DTO schema for the access token
        example: { access_token: '1234' }, // Example response with the access token
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

  /**
   * Endpoint to verify the status of an access token.
   * @param xAuthToken The access token provided in the "x-auth-token" header.
   * @returns An object indicating whether the token is still valid and the remaining lifespan.
   */
  @Post('token/status')
  @ApiOperation({
    summary: 'Verifies the status of an access token',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: TokenStatusDto,
  })
  async getTokenStatus(
    @Headers('x-auth-token') token: string,
  ): Promise<TokenStatusDto> {
    const tokenStatus = await this.authService.verifyToken(token);
    return tokenStatus;
  }
}
