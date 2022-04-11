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
    // RevealedCoords,
    // ArrivalData,
    // Planet,
    // PlanetExtendedInfo,
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
        // Address buyer , now used as key, TODO: check potential bugs on this...
        uint expectedSharedKeyHash;
        uint64 created;                     // when order was created
        bool isActive;                      // inactive after refund/sale
    }

    struct Listing {
        address payable seller;
        uint planetId;
        uint biomebase;
        uint keyCommitment;                 // H(key) being sold, can't store in events?
        uint nonce;
        uint price;                         // cost of key to coordinates
        uint64 escrowTime;                  // time buyer's deposit is locked up for, use timers.sol
        bool isActive;                      // depends on if we allow sellers to delist 
        mapping (uint => Order ) orders;    // uint is just buyer address, only 1 active buy/lsiting at atime, Make it public?
    }

    // Game Constants
    SnarkConstants gameConstants;

    // States
    uint public numListings;                       // incremental, maybe use Counters.sol
    mapping (uint => Listing) public listings;     // uint is incremental; make this public?

    // DF storage contract
    GetterInterface df;

    // Verifier functions
    ListVerifier public listVerifier;
    SaleVerifier public saleVerifier;

    // Events
    event Listed();
    event Delisted();
    event Asked();
    event Sold();
    event Refunded();

    // Checks planet hash is actually in the game
    // TODO write test for this
    modifier validPlanet(uint locationId) {
        uint256[] memory locIds = new uint256[](1);
        ids[0] = locationId;
        PlanetData[] memory p = df.bulkGetPlanetsDataByIds(ids);

        // TODO: double check this is expected in game behavior
        // planetevent metadata? DFPInitPlanetArgs
        // location is loggedat 2 places, AdminCreatePlanetArgs, DFInitPlanetARgs
        // Do both emit events?
        // check is not revealed, check in getRevealedCoords(planethash) => .locationid
        require(true);
        _;
    }

    constructor
    (
        ListVerifier _listVerifier,
        SaleVerifier _saleVerifier,
        address _dfGetterContract
    ) {
        // Reference the deployed verifier contracts

        listVerifier = _listVerifier;
        saleVerifier = _saleVerifier;
        
        //TODO(later): initialize w/ diamond address with additional checks
        df = GetterInterface(_dfGetterContract);
        
        // TODO: get this working with existing game contract
        require(df.getSnarkConstants().PLANETHASH_KEY == 12345);
        gameConstants = df.getSnarkConstants();
    }

    /**
    * @notice Seller can list a secret Dark Forest coordinate for sale
    * @dev `proof` is a zkSnarks proof defined in `list.circom`
    * @param _proof The listing_id proof 
    */
    function list(
        uint[8] memory _proof,
        uint[4] memory _listingId,
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
            _listingId[0],
            _listingId[1],
            _listingId[2],
            _listingId[3],
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

        Listing storage l = listings[numListings];
        l.seller = payable(msg.sender);
        l.planetId = _planetId;
        l.biomebase = _biomebase;
        l.keyCommitment = _keyCommitment;
        l.nonce = _nonce;
        l.price = _price;
        l.escrowTime = _escrowTime;
        l.isActive = true;

        numListings++;

        emit Listed();
        
        return(numListings-1);
    }

    /**
    * TODO
    */
    function delist() external {                     // good for seller to build reputation i guess

    }

    /**
    */
    function ask() external payable {       //noreentrance? payable?

    }

    /**
    */
    function sale() external {              //norenentrance?

    }

    /**
    */
    function refund() public {        //orderid, callable by anyone? or just buyer... becareful of contract buyers

    }
}