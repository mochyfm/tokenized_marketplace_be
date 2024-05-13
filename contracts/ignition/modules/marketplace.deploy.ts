import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const MarketplaceModule = buildModule('MarketplaceModule', (m) => {
  const tokenAddress = m.getParameter('tokenAddress', '');
  const marketplace = m.contract('Marketplace', [tokenAddress]);
  return { marketplace };
});

export default MarketplaceModule;
