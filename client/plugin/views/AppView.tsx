import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { ContractsProvider } from "../components/ContractsContext";
import { Navigation } from "../components/Navigation";
import { MyPlanetsView } from "./MyPlanetsView";
import { MyListingsView } from "./MyListingsView";
import { MyOrdersView } from "./MyOrdersView";
import { MarketView } from "./MarketView";
import { GuideView } from "./GuideView";


export function AppView({ contract }) {
	const [activeTabId, setActiveTab] = useState(0);

	return (
		// contractsProvider has `game` and `market` contracts
		<ContractsProvider value={contract}>
			<Navigation
				tabs={[
					{ name: "Market", TabContent: MarketView },
					{ name: "My Listings", TabContent: MyListingsView },
					{ name: "My Orders", TabContent: MyOrdersView },
					{ name: "My Planets", TabContent: MyPlanetsView },
					{ name: "Guide", TabContent: GuideView }
				]}
			/>
		</ContractsProvider>
	);
}