import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO (Data Transfer Object) representing authentication credentials.
 */
export class AuthCredentialsDto {
  /**
   * The username of the user.
   * @example 'john_doe'
   * @minimum 5
   * @maximum 20
   * @required
   */
  @ApiProperty({
    description: 'The username of the user',
    minLength: 5,
    maxLength: 20,
    example: 'john_doe',
    required: true,
  })
  username: string;

  /**
   * The password of the user.
   * @minimum 8
   * @maximum 20
   * @required
   * @writeOnly
   */
  @ApiProperty({
    description: 'The password of the user',
    minLength: 8,
    maxLength: 20,
    example: 'i_love_anna_doe',
    required: true,
    writeOnly: true,
  })
  password: string;
}
