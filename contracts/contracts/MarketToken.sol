// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MarketToken is ERC20 {
    constructor(uint256 initialSupply) ERC20('Market Token', 'MT') {
        _mint(msg.sender, initialSupply);
    }
}

contract ICO {
    MarketToken public token;
    address public owner;
    uint256 public tokenPrice;
    mapping(address => uint256) public balances;

    event TokensPurchased(
        address buyer,
        uint256 amountPaid,
        uint256 amountReceived
    );

    constructor(address _tokenAddress) {
        token = MarketToken(_tokenAddress);
        owner = msg.sender;
        tokenPrice = 1e15;
    }

    function buyTokens() external payable {
        require(msg.value > 0, 'Please send some Ether to buy tokens');

        uint256 tokenAmount = (msg.value * 1e15) / tokenPrice;
        require(
            token.balanceOf(address(this)) >= tokenAmount,
            'Not enough tokens available for sale'
        );

        token.transfer(msg.sender, tokenAmount);
    }

    function withdraw() external {
        require(msg.sender == owner, 'Only the owner can withdraw');
        payable(owner).transfer(address(this).balance);
    }
}
