// retrieves on chain stuff
import * as c from './constants';
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";

declare const df: GameManager;
declare const ui: GameUIManager;

export async function getContract () {
	const nmFactoryContract = await df.loadContract(c.NIGHTMARKET_FACTORY_ADDR, c.NIGHTMARKET_FACTORY_ABI);
	const gameAddress = df.getContractAddress();
	const marketAddress = await nmFactoryContract.gameToMarket(gameAddress);

	console.log({
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
