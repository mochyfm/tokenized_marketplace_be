import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const initialSupply: bigint = 10_000_000n;

const MarketTokenModule = buildModule('MarketTokenModule', (m) => {
  const marketToken = m.contract('MarketToken', [initialSupply.toString()]);
  return { marketToken };
});

export default MarketTokenModule;
