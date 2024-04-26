import { Injectable } from '@nestjs/common';
import { XMLBuilder, XmlBuilderOptions } from 'fast-xml-parser';

@Injectable()
export class XMLService {
  objectToXml(obj: any, options?: XmlBuilderOptions): string {
    const xml = new XMLBuilder(options).build(obj);
    return xml;
  }
}
