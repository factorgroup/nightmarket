// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Zk verifiers
import {IVerifier as IListVerifier} from "./ListVerifier.sol";
import {IVerifier as ISaleVerifier} from "./SaleVerifier.sol";

// DF interface imports
import {WithStorage, SnarkConstants, GameConstants} from "./darkforest/LibStorage.sol";

// DF type imports
import {RevealedCoords, PlanetExtendedInfo, PlanetData} from "./darkforest/DFTypes.sol";

// A (reduced) interface for DFGetterFacet
import {IGetter} from "./darkforest/GetterInterface.sol";

/**
 * @dev Converts boolean to int
 */
function boolToUInt(bool x) pure returns (uint256 r) {
    assembly {
        r := x
    }
}

/**
 * @title NightMarket
 * @author @0xSage
 * @notice
 * @dev
 * @custom:experimental
 */
contract NightMarket is ReentrancyGuard {
    using SafeMath for uint256;

    struct Order {
        address payable buyer;
        uint256 expectedSharedKeyHash;
        uint256 created;
        bool isActive;
    }

    struct Listing {
        address payable seller;
        uint256 keyCommitment;
        uint256 price;
        uint256 escrowTime;
        uint256 numOrders;
        bool isActive;
        mapping(uint256 => Order) orders;
    }

    uint256 public numListings;
    mapping(uint256 => Listing) public listings;

    // DF storage getter
    IGetter public immutable df;

    // Game Constants
    SnarkConstants public zkConstants;

    // Verifiers
    IListVerifier public immutable listVerifier;
    ISaleVerifier public immutable saleVerifier;

    // Events
    event Contract(uint256 planetHash, uint256 SpacetypeHash);
    event Listed(
        address indexed seller,
        uint256 indexed listingId,
        uint256 indexed locationId,
        uint256 biombase,
        uint256 nonce
    );
    event Delisted(address indexed seller, uint256 indexed listingId);
    event Asked(address indexed buyer, uint256 indexed listingId);
    event Sold(uint256 indexed listingId, uint256 orderId, uint256 nonce);
    event Refunded(uint256 indexed listingId, uint256 orderId);

    /**
     * @notice Checks planet is in game and not revealed yet
     * @param locationId The hash of xy coordinates
     */
    modifier validPlanet(uint256 locationId) {
        require(
            df.planetsExtendedInfo(locationId).isInitialized,
            "Planet doesn't exit or is not initialized"
        );

        require(
            df.revealedCoords(locationId).locationId != locationId,
            "Planet coordinates have already been revealed"
        );
        _;
    }

    /**
     * @dev The constructor
     * @param _listVerifier the address of SNARK List Verifier for this contract
     * @param _saleVerifier the address of SNARK Sale Verifier for this contract
     * @param _gameContract the address of the Dark Forest game
     */
    constructor(
        IListVerifier _listVerifier,
        ISaleVerifier _saleVerifier,
        address _gameContract
    ) {
        listVerifier = _listVerifier;
        saleVerifier = _saleVerifier;

        df = IGetter(_gameContract);
        zkConstants = df.getSnarkConstants();
        emit Contract(zkConstants.PLANETHASH_KEY, zkConstants.SPACETYPE_KEY);
    }

    /**
     * @notice Seller can list a secret Dark Forest coordinate for sale
     * @dev Seller generates `_proof` offchain in `list.circom`.
     * @param _proof The listing_id proof from seller
     * @param _coordEncryption The pre-encrypted coordinates from seller
     * @return listingId indexes at 1
     */
    function list(
        uint256[8] memory _proof,
        uint256[4] memory _coordEncryption,
        uint256 _nonce,
        uint256 _keyCommitment,
        uint256 _locationId,
        uint256 _biomebase,
        uint256 _price,
        uint256 _escrowTime
    ) external validPlanet(_locationId) returns (uint256 listingId) {
        require(_nonce < 2 ^ 218, "Nonce must be smaller than 2^218");

        uint256[15] memory publicInputs = [
            zkConstants.PLANETHASH_KEY,
            zkConstants.BIOMEBASE_KEY,
            zkConstants.SPACETYPE_KEY,
            zkConstants.PERLIN_LENGTH_SCALE,
            boolToUInt(zkConstants.PERLIN_MIRROR_X),
            boolToUInt(zkConstants.PERLIN_MIRROR_Y),
            _coordEncryption[0],
            _coordEncryption[1],
            _coordEncryption[2],
            _coordEncryption[3],
            _nonce,
            _keyCommitment,
            _locationId,
            _biomebase,
            uint256(uint160(address(msg.sender)))
        ];

        require(
            listVerifier.verify(_proof, publicInputs),
            "Seller list coordinates: invalid proof"
        );

        listingId = numListings++;

        Listing storage l = listings[listingId];
        l.seller = payable(msg.sender);
        l.keyCommitment = _keyCommitment;
        l.price = _price;
        l.escrowTime = _escrowTime;
        l.isActive = true;

        emit Listed(msg.sender, listingId, _locationId, _biomebase, _nonce);
    }

    /**
     * @notice Seller can delist an active listing
     * @dev Sellers who care about reputation will use this fn, otherwise, unlikely
     * @param _listingId the ID from list() step
     */
    function delist(uint256 _listingId) external {
        Listing storage l = listings[_listingId];
        require(l.isActive, "Listing is already inactive");
        require(msg.sender == l.seller, "Only seller can delist their listing");
        l.isActive = false;
        emit Delisted(msg.sender, _listingId);
    }

    /**
     * @notice Buyer can ask for order(s) from active listings
     * @dev A listing can have multiple orders from same buyer
     * @param _expectedSharedKeyHash A H(ecdh(buyerPrivKey, sellerPubKey)) computed by Buyer
     * return orderId Buyer keeps this for future refunds
     */
    function ask(uint256 _listingId, uint256 _expectedSharedKeyHash)
        external
        payable
        returns (uint256 orderId)
    {
        Listing storage l = listings[_listingId];
        require(l.isActive, "Listing is no longer active");
        require(msg.value == l.price, "Payment is incorrect");

        l.orders[l.numOrders++] = Order({
            buyer: payable(msg.sender),
            expectedSharedKeyHash: _expectedSharedKeyHash,
            created: block.number,
            isActive: true
        });
        emit Asked(msg.sender, _listingId);
        return l.numOrders;
    }

    /**
     * @notice Seller can submit a proof of sale.
     * @dev Seller generates `_proof` offchain in `sale.circom`
     * @param _buyerPubKey We have buyer input this in the correct format to save gas
     * It is safe bc any pubKey is ultimately constrained with expectedSharedKeyHash
     */
    function sale(
        uint256 _listingId,
        uint256 _orderId,
        uint256[2] memory _buyerPubKey,
        uint256[8] memory _proof,
        uint256[4] memory _keyEncryption,
        uint256 _nonce
    ) external nonReentrant {
        Listing storage l = listings[_listingId];
        require(l.seller == msg.sender, "Only seller can close sale");
        require(l.isActive, "Listing is inactive");
        require(_nonce < 2 ^ 218, "Nonce must be smaller than 2^218");

        Order storage o = l.orders[_orderId];
        require(o.isActive, "Order is inactive");

        uint256[9] memory publicInputs = [
            _buyerPubKey[0],
            _buyerPubKey[1],
            _keyEncryption[0],
            _keyEncryption[1],
            _keyEncryption[2],
            _keyEncryption[3],
            _nonce,
            l.keyCommitment,
            o.expectedSharedKeyHash
        ];

        require(
            saleVerifier.verify(_proof, publicInputs),
            "sale proof invalid"
        );

        o.isActive = false;

        l.seller.transfer(l.price);

        emit Sold(_listingId, _orderId, _nonce);
    }

    /**
     * @notice Anyone can request a refund on a qualifying order
     * @dev Seller can also force refund (spam) buyers who submitted invalid expectedSharedKeyHash
     * @param _listingId the ID from list() step
     * @param _orderId the ID from ask() step
     */
    function refund(uint256 _listingId, uint256 _orderId) public nonReentrant {
        //orderid, callable by anyone? or just buyer... becareful of contract buyers
        Listing storage l = listings[_listingId];
        Order storage o = l.orders[_orderId];
        require(o.isActive, "Order previously refunded");

        if (_escrowExpired(o.created, l.escrowTime) || !l.isActive) {
            o.isActive = false;
            o.buyer.transfer(l.price);
            emit Refunded(_listingId, _orderId);
        }
    }

    function _escrowExpired(uint256 _created, uint256 _escrowTime)
        internal
        view
        returns (bool)
    {
        uint256 elapsed = block.number.sub(_escrowTime);
        return (elapsed > _created);
    }
}
