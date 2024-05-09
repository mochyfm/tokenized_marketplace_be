import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatabaseService } from '../service/database.service';

@ApiTags('DataBase')
@Controller('db')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('status')
  @Header('Content-Type', 'application/xml')
  async checkDatabaseStatus(): Promise<string> {
    return this.databaseService.checkDatabaseStatus();
  }
}
