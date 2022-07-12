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

    function initNightMarket(address _gameContract, address _owner) private {
        NightMarket nightmarket = new NightMarket(listVerifier, saleVerifier, _gameContract);
        gameToMarket[_gameContract] = nightmarket;
        marketOwner[_gameContract] = _owner;
    }

    function setNightMarket(address _gameContract) external {
        require(address(gameToMarket[_gameContract]) == address(0), "NM already init. for game contract");
        initNightMarket(_gameContract, msg.sender);
    }

}