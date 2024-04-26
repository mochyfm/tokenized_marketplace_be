import { Module } from '@nestjs/common';
import { StatusController } from './controllers/status.controller';
import { StatusService } from './services/status.service';
import { XMLService } from 'src/utils/XML.tools';

@Module({
  controllers: [StatusController],
  providers: [StatusService, XMLService],
})
export class StatusModule {}
