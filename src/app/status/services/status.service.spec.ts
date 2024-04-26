import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { StatusService } from './status.service';
import { Router, Request } from 'express';
import { XMLService } from 'src/utils/XML.tools';
import { StatusController } from '../controllers/status.controller';

/**
 * Test suite for the StatusService class.
 */
describe('StatusService', () => {
  let statusService: StatusService;
  let xmlService: XMLService;

  /**
   * Setup function to initialize the services before each test case.
   */
  beforeEach(() => {
    xmlService = new XMLService();
    statusService = new StatusService(xmlService);
  });

  /**
   * Test case to verify the behavior of the getEndpoints method.
   */
  it('should return categorized endpoints', async () => {
    // Mock Router and Request objects
    const mockRouter = {
      stack: [
        {
          route: {
            path: '/api/health',
            stack: [{ method: 'get' }],
          },
        },
        {
          route: {
            path: '/api/user',
            stack: [{ method: 'post' }],
          },
        },
      ],
    } as unknown as Router;

    const mockRequest = {
      app: {
        _router: mockRouter,
      },
    } as unknown as Request;

    // Call the method under test
    const result = await statusService.getEndpoints(mockRequest);

    // Check the result
    expect(result).toEqual({
      api: {
        GET: ['/api/health'],
        POST: ['/api/user'],
      },
    });
  });

  /**
   * Test case to verify the behavior of the checkHealth method in the StatusController.
   */
  it('should return a XML output with ok status for health check', async () => {
    // Mock the XMLService.objectToXml method
    const parseToXMLSpy = vitest
      .spyOn(xmlService, 'objectToXml')
      .mockReturnValue('<health>ok</health>');

    // Create an instance of StatusController
    const statusController = new StatusController(statusService);

    // Call the method under test
    const result = statusController.checkHealth();

    // Check if the parseToXML method is called with the correct arguments
    expect(parseToXMLSpy).toHaveBeenCalledWith({ health: 'ok' });

    // Check the result
    expect(result).toEqual('<health>ok</health>');

    // Restore the original implementation of parseToXML method
    parseToXMLSpy.mockRestore();
  });
});
