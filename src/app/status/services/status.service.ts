import { Injectable } from '@nestjs/common';
import { UtilsService } from '../../../utils/utils.service';

@Injectable()
export class StatusService {
  constructor(private readonly utilsService: UtilsService) {}

  getStatus() {
    return this.utilsService.objectToXml({ health: 'ok' });
  }
}
