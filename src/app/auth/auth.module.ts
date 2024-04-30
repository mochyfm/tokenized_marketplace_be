import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { JWT_CONSTANTS } from 'src/constants/security.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANTS.secretKey,
      signOptions: { expiresIn: JWT_CONSTANTS.expirationTime },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
