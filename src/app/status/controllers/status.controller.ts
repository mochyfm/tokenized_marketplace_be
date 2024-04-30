import { Controller, Get, Header } from '@nestjs/common';
import { StatusService } from '../services/status.service';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller responsible for handling status-related requests.
 */
@ApiTags('Status')
@Controller()
export class StatusController {
  /**
   * Creates an instance of StatusController.
   * @param statusService Instance of StatusService for status-related operations.
   */
  constructor(private readonly statusService: StatusService) {}

  /**
   * Handles the 'health' endpoint GET request.
   * Returns response with health status.
   * @returns response with health status with 'ok' or 'notOk'.
   */
  @Get('health')
  @Header('Content-Type', 'application/xml')
  checkHealth() {
    return this.statusService.parseToXML({ health: 'ok' });
  }
}
