import { Injectable } from '@nestjs/common';
import { XMLBuilder, XmlBuilderOptions } from 'fast-xml-parser';
import { ethers } from 'ethers';

/**
 * Service providing utility methods.
 */
@Injectable()
export class UtilsService {
  constructor() {}

  /**
   * Converts JavaScript object to XML string.
   * @param obj The JavaScript object to convert.
   * @param options Optional XML builder options.
   * @returns XML string representation of the object.
   */
  objectToXml(obj: any, options?: XmlBuilderOptions): string {
    const xml = new XMLBuilder(options).build(obj);
    return xml;
  }

  /**
   * Decodes base64-encoded transaction data.
   * @param base64String The base64-encoded string to decode.
   * @returns The decoded transaction data.
   */
  decodeTxData(base64String: string): string {
    const decodedBytes = ethers.decodeBase64(base64String);
    const transcribedText = ethers.toUtf8String(decodedBytes);
    return transcribedText;
  }

  /**
   * Encodes transaction data to base64.
   * @param content The content to encode.
   * @returns The base64-encoded transaction data.
   */
  encodeTxData(content: string): string {
    const textBytes = ethers.toUtf8Bytes(content);
    const base64String = ethers.encodeBase64(textBytes);
    return base64String;
  }
}
