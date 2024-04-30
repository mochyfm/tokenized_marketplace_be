import { Controller, Get, Param } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RpcInfoDto } from '../dto/rpc.info.dto';
import { RpcService } from '../services/rpc.service';
import { AddressInfoDto } from '../dto/address.info.dto';

@ApiTags('RPC (ETH)')
@Controller('rpc')
export class RpcController {
  constructor(private readonly rpcService: RpcService) {}

  @Get('info')
  @ApiOperation({ summary: 'Get information about the RPC' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: RpcInfoDto,
  })
  async getInfo(): Promise<RpcInfoDto> {
    return this.rpcService.getRpcInfo();
  }

  @Get('address/:address')
  @ApiOperation({ summary: 'Get information about an Ethereum address' })
  @ApiHeader({
    name: 'x-auth-token',
    required: true,
    description: 'Token de autenticación',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: AddressInfoDto,
  })
  async getAddressInfo(
    @Param('address') address: string,
  ): Promise<AddressInfoDto> {
    return this.rpcService.getAddressInfo(address);
  }
}
