// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './MarketToken.sol';

contract Marketplace {
    struct Purchase {
        string purchaseCID;
        uint256 offerId;
        address buyer;
        bool refunded;
    }

    struct Offer {
        string offerCID;
        address seller;
        uint256 price;
    }

    enum UserRole {
        Admin,
        Seller,
        Buyer
    }

    mapping(address => UserRole) public userRoles;
    mapping(uint256 => Purchase) public purchases;
    mapping(uint256 => Offer) public offers;

    uint256 public nextOfferId = 0;
    uint256 public nextPurchaseId = 0;
    uint256 public tokenPrice = 1 ether;
    address public marketAddress;

    MarketToken public token;

    event TokensPurchased(
        address indexed buyer,
        uint256 etherAmount,
        uint256 tokenAmount
    );
    event OfferCreated(
        uint256 indexed offerId,
        string offerCID,
        address indexed seller,
        uint256 price
    );
    event OfferUpdated(uint256 indexed offerId, string offerCID, uint256 price);
    event PurchaseMade(
        uint256 indexed purchaseId,
        string purchaseCID,
        uint256 offerId,
        address indexed buyer
    );
    event UserRoleSet(address indexed user, UserRole role);
    event TokensRefunded(address indexed buyer, uint256 amount);

    modifier onlyRole(UserRole _role) {
        require(
            userRoles[msg.sender] == _role ||
                userRoles[msg.sender] == UserRole.Admin,
            'Unauthorized'
        );
        _;
    }

    constructor(uint256 initialSupply) {
        marketAddress = address(this);
        token = new MarketToken(initialSupply, marketAddress);
        userRoles[msg.sender] = UserRole.Admin;
    }

    function buyMarketTokens() public payable {
        require(msg.value > 0, 'Send Ether to buy tokens');
        uint256 tokenAmount = msg.value / tokenPrice;
        require(
            token.balanceOf(address(this)) >= tokenAmount,
            'Insufficient tokens in the contract'
        );
        token.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    function setTokenPrice(uint256 _newPrice) public onlyRole(UserRole.Admin) {
        tokenPrice = _newPrice;
    }

    function createOffer(string memory _offerCID, uint256 _price)
        public
        onlyRole(UserRole.Seller)
    {
        offers[nextOfferId] = Offer(_offerCID, msg.sender, _price);
        emit OfferCreated(nextOfferId, _offerCID, msg.sender, _price);
        nextOfferId++;
    }

    function updateOffer(
        uint256 _offerId,
        string memory _offerCID,
        uint256 _newPrice
    ) public onlyRole(UserRole.Seller) {
        Offer storage offer = offers[_offerId];
        offer.offerCID = _offerCID;
        offer.price = _newPrice;
        emit OfferUpdated(_offerId, _offerCID, _newPrice);
    }

    function purchaseOffer(uint256 _offerId) public onlyRole(UserRole.Buyer) {
        Offer storage offer = offers[_offerId];
        require(
            token.transferFrom(msg.sender, offer.seller, offer.price),
            'Failed to transfer tokens'
        );
        uint256 purchaseId = nextPurchaseId++;
        purchases[purchaseId] = Purchase(
            offer.offerCID,
            _offerId,
            msg.sender,
            false
        );
        emit PurchaseMade(purchaseId, offer.offerCID, _offerId, msg.sender);
    }

    function setUserRole(address _user, UserRole _role)
        public
        onlyRole(UserRole.Admin)
    {
        userRoles[_user] = _role;
        emit UserRoleSet(_user, _role);
    }

    function refund(uint256 _purchaseId) public onlyRole(UserRole.Buyer) {
        Purchase storage purchase = purchases[_purchaseId];
        require(
            purchase.buyer == msg.sender,
            'You are not the buyer of this purchase'
        );
        require(!purchase.refunded, 'This purchase has already been refunded');
        uint256 refundAmount = offers[purchase.offerId].price;
        require(token.transfer(purchase.buyer, refundAmount), 'Refund failed');
        purchase.refunded = true;
        emit TokensRefunded(purchase.buyer, refundAmount);
    }

    function getUserTokenBalance(address _user) public view returns (uint256) {
        return token.balanceOf(_user);
    }
}
