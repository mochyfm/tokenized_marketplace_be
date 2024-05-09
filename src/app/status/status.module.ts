import { Module } from '@nestjs/common';
import { StatusController } from './controllers/status.controller';
import { StatusService } from './services/status.service';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  controllers: [StatusController],
  providers: [StatusService, UtilsService],
})
export class StatusModule {}
