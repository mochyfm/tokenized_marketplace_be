import { Module } from '@nestjs/common';
import { DatabaseService } from './service/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABSE_CONSTANTS } from 'src/constants/database.constants';
import { DatabaseController } from './controllers/database.controller';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${DATABSE_CONSTANTS.host}/${DATABSE_CONSTANTS.name}`,
    ),
  ],
  providers: [DatabaseService, UtilsService],
  controllers: [DatabaseController],
})
export class DatabaseModule {}
