// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MarketToken is ERC20 {
    constructor(uint256 initialSupply, address _marketplaceAddress)
        ERC20('Market Token', 'MT')
    {
        _mint(_marketplaceAddress, initialSupply);
    }
}
