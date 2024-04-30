import { Module } from '@nestjs/common';
import { RpcController } from './controllers/rpc.controller';
import { RpcService } from './services/rpc.service';

@Module({
  controllers: [RpcController],
  providers: [RpcService],
  imports: [],
})
export class BlockchainModule {}
