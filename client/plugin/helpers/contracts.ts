// retrieves on chain stuff
import * as c from './constants';
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";

declare const df: GameManager;
declare const ui: GameUIManager;

export async function getContract() {
	return {
		// game: await df.loadContract(c.DF_ADDR, c.DF_ABI),
		market: await df.loadContract(c.NIGHTMARKET_ADDR, c.NIGHTMARKET_ABI)
	}
};
