import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { ContractsProvider } from "../components/ContractsContext";
import { Navigation } from "../components/Navigation";
import { MyPlanetsView } from "./MyPlanetsView";

export function AppView({ contracts }) {
	const [activeTabId, setActiveTab] = useState(0);

	return (
		// contractsProvider has `game` and `market` contracts
		<ContractsProvider value={contracts}>
			<Navigation
				tabs={[
					{ name: "MyPlanets", TabContent: MyPlanetsView }
				]}
			/>
		</ContractsProvider>
	);
}