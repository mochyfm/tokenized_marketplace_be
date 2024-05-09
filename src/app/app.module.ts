import {
  INestApplication,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { StatusModule } from './status/status.module';
import { AuthMiddleware } from 'src/middlewares/global/auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BKND_CONSTANTS } from 'src/constants/backend.constants';
import { JWT_CONSTANTS } from 'src/constants/security.constants';
import { HeaderMiddleware } from 'src/middlewares/global/header.middleware';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANTS.secretKey,
      signOptions: { expiresIn: JWT_CONSTANTS.expirationTime },
    }),
    AuthModule,
    BlockchainModule,
    UsersModule,
    DatabaseModule,
    StatusModule,
    UtilsModule,
    SwaggerModule,
  ],
})
export class AppModule {
  /**
   * Configures middleware for the application.
   *
   * @param consumer The middleware consumer to configure the middlewares for the application.
   */
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HeaderMiddleware).forRoutes('*');
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
