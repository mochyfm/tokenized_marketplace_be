import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO (Data Transfer Object) representing an access token.
 */
export class AccessTokenDto {
  /**
   * The access token string.
   * @example 'eyJhbGciOiJIUzI1NiIsInR5...'
   */
  @ApiProperty({
    description: 'The access token string',
    example: 'eyJhbGciOiJIUzI1NiIsInR5...',
  })
  access_token: string;

  /**
   * The expiration time of the access token in seconds.
   * @example 3600
   */
  @ApiProperty({
    description: 'The expiration time of the access token in seconds',
    example: 3600,
  })
  expires_in: number;
}
