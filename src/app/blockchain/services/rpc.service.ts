import { Injectable } from '@nestjs/common';
import { ethers, JsonRpcProvider } from 'ethers';
import { BLK_CONSTANTS } from 'src/constants/blockchain.constants';
import { RpcInfoDto } from '../dto/rpc.info.dto';
import { AddressInfoDto } from '../dto/address.info.dto';

@Injectable()
export class RpcService {
  private readonly provider: JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      `${BLK_CONSTANTS.rpcProviderProtocol}://${BLK_CONSTANTS.rpcProviderIp}:${BLK_CONSTANTS.rpcProviderPort}`,
    );
  }

  async getBlockNum(): Promise<number> {
    return this.provider.getBlockNumber();
  }

  async getRpcInfo(): Promise<RpcInfoDto> {
    const rpcUrl = this.provider._getConnection().url;
    const currentBlockNumber = await this.provider.getBlockNumber();
    const rpcActive = true; // Consideramos que el RPC siempre está activo si obtenemos la URL correctamente

    // Puedes agregar más información sobre el proveedor RPC si lo deseas
    const rpcVersion = ''; // La versión del proveedor RPC
    const rpcProviderUrl = ''; // La URL del proveedor RPC
    const rpcProviderDescription = ''; // La descripción del proveedor RPC
    const connectedPeers = 0; // El número de pares conectados al proveedor RPC

    // Construir el objeto RpcInfoDto con la información recopilada
    const rpcInfo: RpcInfoDto = {
      rpcUrl,
      currentBlockNumber,
      rpcActive,
      rpcVersion,
      rpcProviderUrl,
      rpcProviderDescription,
      connectedPeers,
    };

    return rpcInfo;
  }

  /**
   * Gets detailed information about an Ethereum address.
   * @param address The Ethereum address for which information is requested.
   * @returns An object containing detailed information about the Ethereum address.
   */
  async getAddressInfo(address: string): Promise<AddressInfoDto> {
    const balance = await this.provider.getBalance(address);
    const transactionCount = await this.provider.getTransactionCount(address);
    const nonce = await this.provider.getTransactionCount(address, 'latest');
    const addressInfo: AddressInfoDto = {
      address,
      balance: ethers.formatEther(balance),
      transactionCount,
      nonce,
    };

    return addressInfo;
  }
}
