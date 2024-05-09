import { describe, expect, it, vitest } from 'vitest';
import { StatusService } from './status.service';
import { StatusController } from '../controllers/status.controller';
import { UtilsService } from 'src/utils/utils.service';

/**
 * Test suite for the StatusService class.
 */
describe('StatusService', () => {
  const utilsService: UtilsService = new UtilsService();
  const statusService: StatusService = new StatusService(utilsService);

  /**
   * Test case to verify the behavior of the checkHealth method in the StatusController.
   */
  it('should return a XML output with ok status for health check', async () => {
    // Mock the XMLService.objectToXml method
    const parseToXMLSpy = vitest
      .spyOn(utilsService, 'objectToXml')
      .mockReturnValue('<health>ok</health>');

    // Create an instance of StatusController
    const statusController = new StatusController(statusService);

    // Call the method under test
    const result = statusController.checkHealth();

    // Check if the parseToXML method is called with the correct arguments
    expect(parseToXMLSpy).toHaveBeenCalledWith({ health: 'ok' });

    // Check the result
    expect(result).toEqual('<health>ok</health>');
    expect(result).not.toEqual('<health>notOk</health>');

    // Restore the original implementation of parseToXML method
    parseToXMLSpy.mockRestore();
  });
});
