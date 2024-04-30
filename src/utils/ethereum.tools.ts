import { ethers } from 'ethers';

export function decodeTxData(base64String: string): string {
  // Decodifica la cadena base64 y transcribe los bytes a texto
  const decodedBytes = ethers.decodeBase64(base64String);
  const transcribedText = ethers.toUtf8String(decodedBytes);
  return transcribedText;
}

export function encodeTxData(content: string): string {
  const textBytes = ethers.toUtf8Bytes(content);
  const base64String = ethers.encodeBase64(textBytes);
  return base64String;
}
