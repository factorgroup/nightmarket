pragma solidity >=0.8.0;

/**
 * @title NightMarket
 * @dev 
 *
 */
contract NightMarket {

    struct Order {
        address buyer;                      // payable?
        uint listingId;                     // is this needed… ?
        uint created;                       // when order was created
        uint expectedSharedKeyHash;
        uint payment;
        bool isActive;                        // is there another way to track?
    }

    struct Listing {
        address payable seller;
        uint locationHash;
        uint biomebase;
        uint keyCommitment;                 // H(key) being sold, can't store in events?
        uint price;                         // cost of key to coordinates
        uint escrowTime;                    // time buyer's deposit is locked up for
        bool isActive;                      // depends on if we allow sellers to delist 
        mapping (uint => Order ) orders;    // Make it public?
    }

    uint numListings;                       // incremental
    mapping (uint => Listing) listings;     // make this public?

    /**
    * TODO
    */
    function list() external payable {      // noreentrancy? payable?

    }

    /**
    * TODO
    */
    function delist()                       // good for seller reputation i guess

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
    function refund() {                     //orderid, callable by anyone? or just buyer... becareful of contract buyers

    }
}