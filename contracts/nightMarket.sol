// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

import "../github/OpenZeppelin/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import {Verifier as ListVerifier} from "./listVerifier.sol";
import {Verifier as SaleVerifier} from "./saleVerifier.sol";

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
        uint256 expectedSharedKeyHash;
        uint64 created; // when order was created
        bool isActive; // inactive after refund/sale
    }

    struct Listing {
        address payable seller;
        uint256 planetId;
        uint256 biomebase;
        uint256 keyCommitment; // H(key) being sold, can't store in events?
        uint256 nonce;
        uint256 price; // cost of key to coordinates
        uint64 escrowTime; // time buyer's deposit is locked up for, use timers.sol
        bool isActive; // depends on if we allow sellers to delist
        mapping(uint256 => Order) orders; // uint is just buyer address, only 1 active buy/lsiting at atime, Make it public?
    }

    // Constants
    uint256 constant PLANETHASH_KEY = uint256(7);
    uint256 constant BIOMEBASE_KEY = uint256(8);
    uint256 constant SCALE = uint256(4096);
    uint256 constant xMirror = uint256(0); //double check is this user input?
    uint256 constant yMirror = uint256(0);

    // States
    uint256 numListings; // incremental, maybe use Counters.sol
    mapping(uint256 => Listing) listings; // uint is incremental; make this public?

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
    modifier validPlanet(uint256 planetId) {
        // TODO
        require(true);
        _;
    }

    constructor(ListVerifier _listVerifier, SaleVerifier _saleVerifier) {
        listVerifier = _listVerifier;
        saleVerifier = _saleVerifier;

        //TODO: initialize with DF game contract
    }

    /**
     * @notice Seller can list a secret Dark Forest coordinate for sale
     * @dev `proof` is a zkSnarks proof defined in `list.circom`
     * @param _proof The listing_id proof
     */
    function list(
        uint256[8] memory _proof,
        uint256[4] memory _listingId,
        uint256 _nonce,
        uint256 _keyCommitment,
        uint256 _planetId,
        uint256 _biomebase,
        uint256 _price,
        uint64 _escrowTime
    )
        external
        payable
        nonReentrant
        validPlanet(_planetId)
        returns (uint256 listingId)
    {
        require(_nonce < 2 ^ 218);

        uint256[14] memory publicInputs = [
            PLANETHASH_KEY,
            BIOMEBASE_KEY,
            SCALE,
            xMirror,
            yMirror,
            _listingId[0],
            _listingId[1],
            _listingId[2],
            _listingId[3],
            _nonce,
            _keyCommitment,
            _planetId,
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
        return (numListings - 1);
    }

    /**
     * TODO
     */
    function delist() external {
        // good for seller to build reputation i guess
    }

    /**
     */
    function ask() external payable {
        //noreentrance? payable?
    }

    /**
     */
    function sale() external {
        //norenentrance?
    }

    /**
     */
    function refund() public {
        //orderid, callable by anyone? or just buyer... becareful of contract buyers
    }
}
