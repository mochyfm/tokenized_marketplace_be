import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { StatusModule } from './status/status.module';
import { Module } from '@nestjs/common';
@Module({
  imports: [
    AuthModule,
    BlockchainModule,
    UsersModule,
    StorageModule,
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
