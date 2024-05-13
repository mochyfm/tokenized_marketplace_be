import '@nomicfoundation/hardhat-ignition-ethers';
import 'hardhat-ethernal';

export default {
  solidity: '0.8.20',
  networks: {
    hardhat: {},
  },
  ethernal: {
    apiToken: process.env.ETHERNAL_API_TOKEN,
  },
};
