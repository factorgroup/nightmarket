import { h, render } from "preact";
import { AppView } from "./views/AppView";
import { getContract } from "./helpers/contracts";

class NightMarketPlugin {

	constructor() {
		// @ts-expect-error
		this.container = null;
	}

	/**
	 * Called when plugin is launched with the "run" button.
	 */
	async render(container) {

		// @ts-ignore
		this.container = container;
		container.style.width = "600px";
		container.style.height = "400px";

		try {
			const contract = await getContract();
			render(<AppView contract={contract} />, container);
		} catch (err: any) {
			console.error("[NightMarketPlugin] Error starting plugin:", err);
			// @ts-ignore
			render(<div>{err.message}</div>, this.container);
		}
	}

	/**
	 * Called when plugin modal is closed.
	 */
	destroy() {
		// @ts-ignore
		render(null, this.container);
	}
}

/**
 * And don't forget to export it!
 */
export default NightMarketPlugin;
