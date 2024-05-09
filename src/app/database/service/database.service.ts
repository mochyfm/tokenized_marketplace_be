import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { DATABSE_CONSTANTS } from 'src/constants/database.constants';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class DatabaseService {
  constructor(private readonly utilsService: UtilsService) {}

  async checkDatabaseStatus(): Promise<string> {
    try {
      // Intenta realizar una conexión a la base de datos
      await mongoose.connect(
        `mongodb://${DATABSE_CONSTANTS.host}:${DATABSE_CONSTANTS.port}/${DATABSE_CONSTANTS.name}`,
      );
      return this.utilsService.objectToXml({ state: 'Up' });
    } catch (error) {
      console.error('Error connecting to the database:', error);
      return this.utilsService.objectToXml({ state: 'Down' });
    } finally {
      mongoose.disconnect();
    }
  }
}
