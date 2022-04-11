// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

import "../github/OpenZeppelin/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import {WithStorage, SnarkConstants, GameConstants} from "../github/darkforest-eth/eth/contracts/libraries/LibStorage.sol";
import {Verifier as ListVerifier} from "./listVerifier.sol";
import {Verifier as SaleVerifier} from "./saleVerifier.sol";

// DF imports
import {GetterInterface} from "./GetterInterface.sol";

// Type imports
import {
    RevealedCoords,
    // ArrivalData,
    // Planet,
    PlanetExtendedInfo,
    // PlanetExtendedInfo2,
    // PlanetEventType,
    // PlanetEventMetadata,
    // PlanetDefaultStats,
    PlanetData
    // Player,
    // ArtifactWithMetadata,
    // Upgrade,
    // Artifact
} from "../github/darkforest-eth/eth/contracts/DFTypes.sol";

function boolToUInt(bool x) pure returns (uint r) {
  assembly { r := x }
}

/**
 * @title NightMarket
 * @author @0xSage
 * @notice
 * @dev 
 * @custom:experimental
 */
contract NightMarket is ReentrancyGuard {

    //  Type
    struct Order {
        address payable buyer;
        uint expectedSharedKeyHash;
        uint created;                       // block timestamp when order was created
        bool isActive;                      // inactive after refund/sale
    }

    struct Listing {
        address payable seller;
        uint locationId;         // prob doesn't need to be stored, just emitted
        uint biomebase;          // prob doesn't need to be stored, just emitted
        uint keyCommitment;                 // H(key) being sold, can't store in events?
        uint nonce;             // prob doesn't need to be stored, just emitted
        uint price;                         // cost of key to coordinates
        uint64 escrowTime;                  // time buyer's deposit is locked up for, use timers.sol
        bool isActive;                      // depends on if we allow sellers to delist
        uint numOrders;
        mapping (uint => Order ) orders;    // key starts at numOrders=1
    }

    // States
    uint public numListings;                       // TODO: maybe use Counters.sol for safer math
    mapping (uint => Listing) public listings;     // Key starts at numListings=1

    // DF storage contract
    GetterInterface df;

    // Game Constants
    SnarkConstants public gameConstants;

    // Verifier functions
    ListVerifier public listVerifier;
    SaleVerifier public saleVerifier;

    // Events
    event Listed(address indexed seller, uint indexed listingId);
    event Delisted(address indexed seller, uint indexed listingId);
    event Asked();
    event Sold(uint nonce);
    event Refunded();

    // TODO write test for this
    modifier validPlanet(uint locationId) {
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

    constructor
    (
        ListVerifier _listVerifier,
        SaleVerifier _saleVerifier,
        address _dfGetterContract
    ) {
        listVerifier = _listVerifier;
        saleVerifier = _saleVerifier;
        
        //TODO(later): initialize w/ diamond address rather than DFGetterFacet contract?
        df = GetterInterface(_dfGetterContract);
        gameConstants = df.getSnarkConstants();
    }

    /**
    * @notice Seller can list a secret Dark Forest coordinate for sale
    * @dev Seller generates `_proof` offchain in `list.circom`
    * @param _proof The listing_id proof
    * @return listingId as in listings[listingId] => Listing 
    */
    function list(
        uint[8] memory _proof,
        uint[4] memory _coordEncryption,
        uint _nonce,
        uint _keyCommitment,
        uint _locationId,
        uint _biomebase,
        uint _price,
        uint64 _escrowTime
    )
        external payable
        nonReentrant
        validPlanet(_locationId)
        returns (uint listingId)
    {
        require(_nonce < 2^218);

        uint256[15] memory publicInputs = [
            gameConstants.PLANETHASH_KEY,
            gameConstants.BIOMEBASE_KEY,
            gameConstants.SPACETYPE_KEY,
            gameConstants.PERLIN_LENGTH_SCALE,
            boolToUInt(gameConstants.PERLIN_MIRROR_X),
            boolToUInt(gameConstants.PERLIN_MIRROR_Y),
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
        l.locationId = _locationId;
        l.biomebase = _biomebase;
        l.keyCommitment = _keyCommitment;
        l.nonce = _nonce;
        l.price = _price;
        l.escrowTime = _escrowTime;
        l.isActive = true;

        emit Listed(msg.sender, numListings); // Log more things later as needed
    }

    /**
    * @notice Seller can delist an active listing
    * @dev Sellers who care about reputation will use this fn, otherwise, unlikely
    * @param _listingId the ID from list() step
    */
    function delist(uint _listingId) external {
        Listing storage l = listings[_listingId];
        require(msg.sender == l.seller);
        l.isActive = false;
        emit Delisted(msg.sender, numListings);
    }

    /**
    * @notice Buyer can ask on active listings
    * @dev 
    * @param _expectedSharedKeyHash Buyer computes H(ecdh(buyerPrivKey, sellerPubKey))
    * return orderId Buyer keeps this for future refunds
    */
    function ask(uint _listingId, uint _expectedSharedKeyHash) external payable returns (uint orderId) {       //noreentrance? payable?
        Listing storage l = listings[_listingId];
        require(l.isActive, "Listing is no longer active");
        require(msg.value == l.price);
        
        l.orders[l.numOrders++] = Order({
            buyer: payable(msg.sender),
            expectedSharedKeyHash: _expectedSharedKeyHash,
            created: block.timestamp,
            isActive: true
        });
        return l.numOrders;
    }

    /**
    * @notice Seller can submit a proof of sale
    * @dev Seller generates `_proof` offchain in `sale.circom`
    */
    function sale(
        uint _listingId,
        uint _orderId,
        uint[8] memory _proof,
        uint[4] memory _keyEncryption,
        uint _nonce
    ) external {              // norenentrance?
        Listing storage l = listings[_listingId];
        require(l.seller == msg.sender);
        require(l.isActive);
        require(_nonce < 2^218);

        // TODO: double check can buyer submit valid proof on different order?
        // TODO: review any other commits to be checked
        Order memory o = l.orders[_orderId];
        
        uint256[9] memory publicInputs = [
            // User input or retrieve at contract level? doesn't matter bc we check H(sharedkey) anyway
            // TODO: how to get buyer xy coordinates?
            0,
            0,
            _keyEncryption[0],
            _keyEncryption[1],
            _keyEncryption[2],
            _keyEncryption[3],
            _nonce,
            l.keyCommitment,
            o.expectedSharedKeyHash
        ];

        require(saleVerifier.verify(_proof, publicInputs), "sale proof invalid");

        // TODO Pay the seller, withdraw() pattern

        l.orders[_orderId].isActive = false;
    }

    /**
    * @notice Anyone can request a refund on a qualifying order
    * @dev Seller can force refund (spam) buyers who submitted invalid expectedSharedKeyHash
    * @param _listingId the ID from list() step
    * @param _orderId the ID from ask() step
    */
    function refund(uint _listingId, uint _orderId) public {        //orderid, callable by anyone? or just buyer... becareful of contract buyers
        // Refund conditions:
        // listing is inactive (seller closed) OR
        // escrow time is past.
        // Pay the buyer (be careful)
    }
}