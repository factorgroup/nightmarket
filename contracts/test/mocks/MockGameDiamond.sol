// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

// Storage imports
import {WithStorage, SnarkConstants, GameConstants} from "../../darkforest/LibStorage.sol";

// Type imports
import {RevealedCoords, PlanetExtendedInfo, PlanetData} from "../../darkforest/DFTypes.sol";

contract MockGameDiamond {
    function getSnarkConstants()
        external
        pure
        returns (SnarkConstants memory)
    {}

    function planetsExtendedInfo(uint256 key)
        external
        view
        returns (PlanetExtendedInfo memory)
    {}

    function revealedCoords(uint256 key)
        external
        view
        returns (RevealedCoords memory)
    {}
}

// TODO make a mock contract!
