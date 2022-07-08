import { h, render } from "preact";
import { AppView } from "./views/AppView";
import { getConnection, getContract } from "./helpers/contracts";
import { getListings, getTxs } from "./helpers/transactions";
import { ethers } from "ethers";
import GameManager from "@df_client/src/Backend/GameLogic/GameManager";
import { AppTitle } from "./components/AppTitle";
import { DeployNMView } from "./views/DeployNM";

declare const df: GameManager;

class NightMarketPlugin {

	constructor() {
		// @ts-expect-error
		this.container = null;
	}

	/**
	 * Called when plugin is launched with the "run" button.
	 */
	async render (container) {

		// @ts-ignore
		this.container = container;
		container.style.width = "600px";
		container.style.height = "400px";

		try {
			const gameAddress = df.getContractAddress();
			const contract = await getContract();
			
			if (contract.market.address != ethers.constants.AddressZero) {
				const connection = await getConnection();
				const signer = await contract.market.signer;
				const txs = await getTxs(contract.market, signer);
				const listings = await getListings(contract.market, true); // For now, remove request to get all listing events
				render(<AppView contract={contract} signer={signer} connection={connection} txs={txs} listings={listings} />, container);
			}
			
			else {
				render(
					<DeployNMView />, 
					container
				);
			}

		} catch (err: any) {
			console.error("[NightMarketPlugin] Error starting plugin:", err);
			// @ts-ignore
			render(<div>{err.message}</div>, this.container);
		}
	}

	/**
	 * Called when plugin modal is closed.
	 */
	destroy () {
		// @ts-ignore
		render(null, this.container);
	}
}

/**
 * And don't forget to export it!
 */
export default NightMarketPlugin;
