import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO (Data Transfer Object) representing the status of an access token.
 */
export class TokenStatusDto {
  /**
   * Indicates if the access token is valid.
   * @example true
   */
  @ApiProperty({
    description: 'Indicates if the access token is valid',
    example: true,
  })
  isValid: boolean;

  /**
   * The expiration time of the access token in seconds.
   * @example 3600
   */
  @ApiProperty({
    description: 'The expiration time of the access token in seconds',
    example: 3600,
  })
  expiresIn: number;
}
