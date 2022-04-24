import { h, render } from "preact";
import { AppView } from "./views/AppView";
import { getContracts } from "./helpers/contracts";

import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";

declare const df: GameManager;
declare const ui: GameUIManager;

class NightMarketPlugin {

	constructor() {
		// @ts-expect-error
		this.container = null;
	}

	/**
	 * Called when plugin is launched with the "run" button.
	 */
	async render(container) {

		container.style.width = "600px";

		try {
			const contracts = await getContracts();
			render(<AppView contracts={contracts} />, container);
		} catch (err: any) {
			console.error("[NightMarketPlugin] Error starting plugin:", err);
			render(<div>{err.message}</div>, container);
		}
	}

	/**
	 * Called when plugin modal is closed.
	 */
	destroy() {
		// @ts-expect-error
		render(null, this.container);
	}
}

/**
 * And don't forget to export it!
 */
export default NightMarketPlugin;
