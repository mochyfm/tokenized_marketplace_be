import { Module } from '@nestjs/common';
import { StorageController } from './controller/storage.controller';
import { StorageService } from './service/storage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { STORG_CONSTANTS } from 'src/constants/storage.constants';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${STORG_CONSTANTS.host}/${STORG_CONSTANTS.name}`,
      { connectionName: STORG_CONSTANTS.name },
    ),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
