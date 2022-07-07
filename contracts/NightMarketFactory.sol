// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

import "./NightMarket.sol";
import {IVerifier as IListVerifier} from "./ListVerifier.sol";
import {IVerifier as ISaleVerifier} from "./SaleVerifier.sol";

contract NightMarketFactory {

    IListVerifier public immutable listVerifier;
    ISaleVerifier public immutable saleVerifier;
    mapping(address => NightMarket) public gameToMarket;
    mapping(address => address) public marketOwner;

    constructor(IListVerifier _listVerifier, ISaleVerifier _saleVerifier) {
        listVerifier = _listVerifier;
        saleVerifier = _saleVerifier;
    }
    
    function setNightMarket(address _gameContract) public {
        NightMarket nightmarket = new NightMarket(listVerifier, saleVerifier, _gameContract);
        gameToMarket[_gameContract] = nightmarket;
    }


}