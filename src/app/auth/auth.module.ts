import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controller/auth.controller';
import { JWT_CONSTANTS } from 'src/constants/security.constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_CONSTANTS.jwtSecretEnvVariable),
        signOptions: { expiresIn: JWT_CONSTANTS.expirationTime * 1000 },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
