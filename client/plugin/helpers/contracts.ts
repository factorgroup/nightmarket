// retrieves on chain stuff
import * as c from './constants';
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";
import { ethers } from 'ethers';

declare const df: GameManager;
declare const ui: GameUIManager;

export const loadNMFactoryContract = async () => {
	const nmFactoryContract = await df.loadContract(c.NIGHTMARKET_FACTORY_ADDR, c.NIGHTMARKET_FACTORY_ABI);
	return nmFactoryContract
};

export async function getContract () {
	const nmFactoryContract = await loadNMFactoryContract();
	const gameAddress = df.getContractAddress();

	const marketAddress = await nmFactoryContract.gameToMarket(gameAddress);

	if (marketAddress === ethers.constants.AddressZero) {
		// NM not deployed for present game.
		return {
			market: new ethers.Contract(ethers.constants.AddressZero, c.NIGHTMARKET_FACTORY_ABI)
		};
	}

	console.log("NightMarket found!", {
		gameAddress,
		marketAddress
	});

	return {
		market: await df.loadContract(marketAddress, c.NIGHTMARKET_ABI),
	};
};

export async function getConnection () {
	return await df.getEthConnection();
}
