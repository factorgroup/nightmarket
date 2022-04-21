import { h, render } from "preact";

import { AppView } from "./views/AppView";


import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";

declare const df: GameManager;
declare const ui: GameUIManager;
/**
 * Remember, you have access these globals:
 * 1. df - Just like the df object in your console.
 * 2. ui - For interacting with the game's user interface.
 *
 * Let's log these to the console when you run your plugin!
 */

console.log(df, ui);

class NightMarketPlugin {
	container: HTMLDivElement | null;

	constructor() {
	}

	/**
	 * Called when plugin is launched with the "run" button.
	 */
	async render(container) {

		container.style.width = "600px";
		container.style.height = "400px";
		container.style.padding = 0;

		try {
			// const contract = await getContract();
			render(<AppView />, container);
		} catch (err) {
			console.error("[NightMarketPlugin] Error starting plugin:", err);
			render(<div>{ err.message } < /div>, this.container);
    	}
	}

	/**
	 * Called when plugin modal is closed.
	 */
	destroy() { }
}

/**
 * And don't forget to export it!
 */
export default NightMarketPlugin;
