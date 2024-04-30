import {
  INestApplication,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { StatusModule } from './status/status.module';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BKND_CONSTANTS } from 'src/constants/backend.constants';
import { JWT_CONSTANTS } from 'src/constants/security.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANTS.secretKey,
      signOptions: { expiresIn: JWT_CONSTANTS.expirationTime },
    }),
    AuthModule,
    BlockchainModule,
    UsersModule,
    StorageModule,
    StatusModule,
    SwaggerModule,
  ],
})
export class AppModule {
  /**
   * Configures middleware for the application.
   *
   * @param consumer The middleware consumer to configure middleware for the application.
   */
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(BKND_CONSTANTS.swaggerEndpoint) // Excludes the Swagger endpoint from authentication
      .exclude({ path: 'auth', method: RequestMethod.POST }) // Excludes the authentication endpoint for POST /auth
      .forRoutes('*');
  }

  /**
   * Configures Swagger documentation for the application.
   *
   * @param app The NestJS application instance to configure Swagger for.
   */
  static configureSwagger(app: INestApplication<any>): void {
    // Configure Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('Blockchain Marketplace API') // API title
      .setDescription('A decentralized marketplace demo') // API description
      .addServer(
        `http://${BKND_CONSTANTS.backendIp}:${BKND_CONSTANTS.backendPort}`,
        'Local env',
      )
      .setVersion('1.0') // API version
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup(BKND_CONSTANTS.swaggerEndpoint, app, document);
  }
}
