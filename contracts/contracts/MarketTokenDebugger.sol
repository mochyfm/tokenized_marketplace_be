// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import './MarketToken.sol';

contract TokenBank {
    address public bankAddress;
    MarketToken public token;
    uint256 public tokenPrice = 1 ether; // Precio de cada token, ajustable según necesidad

    // Eventos para las operaciones
    event TokensPurchased(
        address indexed buyer,
        uint256 etherAmount,
        uint256 tokenAmount
    );
    event TokensDeposited(address indexed depositor, uint256 tokenAmount);
    event TokensWithdrawn(address indexed withdrawer, uint256 tokenAmount);
    event TokensTransferred(
        address indexed from,
        address indexed to,
        uint256 tokenAmount
    );

    constructor(uint256 initialSupply) {
        bankAddress = address(this);
        token = new MarketToken(initialSupply, bankAddress);
    }

    // Función para comprar tokens con Ether
    function buyTokens() public payable {
        require(msg.value > 0, 'Send Ether to buy tokens');
        uint256 tokenAmount = msg.value / tokenPrice;
        require(
            token.balanceOf(address(this)) >= tokenAmount,
            'Not enough tokens in the bank'
        );
        token.transfer(msg.sender, tokenAmount);
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    // Función para depositar tokens en el banco
    function depositTokens(uint256 _amount) public {
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            'Token transfer failed'
        );
        emit TokensDeposited(msg.sender, _amount);
    }

    // Función para retirar tokens del banco
    function withdrawTokens(uint256 _amount) public {
        require(
            token.balanceOf(address(this)) >= _amount,
            'Not enough tokens in the bank'
        );
        token.transfer(msg.sender, _amount);
        emit TokensWithdrawn(msg.sender, _amount);
    }

    // Función para transferir tokens a otro usuario
    function transferTokens(address _to, uint256 _amount) public {
        require(
            token.balanceOf(msg.sender) >= _amount,
            'Insufficient token balance'
        );
        token.transferFrom(msg.sender, _to, _amount);
        emit TokensTransferred(msg.sender, _to, _amount);
    }

    // Función para ajustar el precio de los tokens
    function setTokenPrice(uint256 _newPrice) public {
        tokenPrice = _newPrice;
    }

    // Función para obtener el balance de tokens de un usuario
    function getTokenBalance(address _user) public view returns (uint256) {
        return token.balanceOf(_user);
    }
}
