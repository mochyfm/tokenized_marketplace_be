import { Injectable } from '@nestjs/common';
import { XMLService } from 'src/utils/xml.tools';

@Injectable()
export class StatusService {
  constructor(private readonly xmlService: XMLService) {}

  /**
   * Parses the given content to XML format.
   * @param content The content to be parsed to XML.
   * @returns The XML representation of the content.
   */
  parseToXML(content: any) {
    return this.xmlService.objectToXml(content);
  }
}
