// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface ERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address owner) external view returns (uint256);
}

contract Marketplace {
    struct Purchase {
        string purchaseCID;
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

    uint256 public nextOfferId;
    uint256 public nextPurchaseId;
    ERC20 public token;

    modifier onlyRole(UserRole _role) {
        require(userRoles[msg.sender] == _role, 'Unauthorized');
        _;
    }

    constructor(address _tokenAddress) {
        token = ERC20(_tokenAddress);
        userRoles[msg.sender] = UserRole.Admin;
        nextOfferId = 0;
        nextPurchaseId = 0;
    }

    function isValidCID(string memory _cid) internal pure returns (bool) {
        return bytes(_cid).length == 46;
    }

    function createOffer(
        string memory _offerCID,
        uint256 _price
    ) external onlyRole(UserRole.Seller) {
        require(isValidCID(_offerCID), 'Invalid CID');
        offers[nextOfferId] = Offer(_offerCID, msg.sender, _price);
        nextOfferId++;
    }

    function updateOffer(
        uint256 _offerId,
        string memory _offerCID,
        uint256 _newPrice
    ) external onlyRole(UserRole.Seller) {
        require(isValidCID(_offerCID), 'Invalid CID');
        Offer storage offer = offers[_offerId];
        offer.offerCID = _offerCID;
        offer.price = _newPrice;
    }

    function purchaseOffer(uint256 _offerId) external onlyRole(UserRole.Buyer) {
        Offer storage offer = offers[_offerId];
        require(
            token.transferFrom(msg.sender, offer.seller, offer.price),
            'Failed to transfer tokens'
        );
        uint256 purchaseId = nextPurchaseId++;
        purchases[purchaseId] = Purchase(offer.offerCID, msg.sender, false);
    }

    function setUserRole(
        address _user,
        UserRole _role
    ) external onlyRole(UserRole.Admin) {
        userRoles[_user] = _role;
    }

    function refund(uint256 _purchaseId) external onlyRole(UserRole.Buyer) {
        Purchase storage purchase = purchases[_purchaseId];
        require(
            purchase.buyer == msg.sender,
            'You are not the buyer of this purchase'
        );
        require(!purchase.refunded, 'This purchase has already been refunded');
        uint256 refundAmount = token.balanceOf(address(this));
        require(token.transfer(purchase.buyer, refundAmount), 'Refund failed');
        purchase.refunded = true;
    }

    function payWithToken(uint256 _purchaseId, uint256 _amount) external {
        Purchase storage purchase = purchases[_purchaseId];
        require(
            purchase.buyer == msg.sender,
            'You are not the buyer of this purchase'
        );
        require(!purchase.refunded, 'This purchase has been refunded');
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            'Token transfer failed'
        );
    }
}
