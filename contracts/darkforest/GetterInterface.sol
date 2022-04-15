/**
 * A (reduced) interface of fns defined here: https://github.com/darkforest-eth/eth/blob/master/contracts/facets/DFGetterFacet.sol
 */

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

// Storage imports
import {WithStorage, SnarkConstants, GameConstants} from "./LibStorage.sol";

// Type imports
import {RevealedCoords, PlanetExtendedInfo, PlanetData} from "./DFTypes.sol";

interface IGetter {
    function getSnarkConstants() external pure returns (SnarkConstants memory);

    function planetsExtendedInfo(uint256 key)
        external
        view
        returns (PlanetExtendedInfo memory);

    function revealedCoords(uint256 key)
        external
        view
        returns (RevealedCoords memory);
}
