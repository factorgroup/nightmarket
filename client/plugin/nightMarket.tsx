import { h, render } from "preact";
import { AppView } from "./views/AppView";

// import GameManager from "@df/GameManager";
// import GameUIManager from "@df/GameUIManager";

// declare const df: GameManager;
// declare const ui: GameUIManager;

/**
 * Remember, you have access these globals:
 * 1. df - Just like the df object in your console.
 * 2. ui - For interacting with the game's user interface.
 *
 * Let's log these to the console when you run your plugin!
 */

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
		container.style.height = "400px";

		try {
			// const contract = await getContract();
			console.log("Here in try block");
			const contract = null;
			render(<AppView />, container);
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
