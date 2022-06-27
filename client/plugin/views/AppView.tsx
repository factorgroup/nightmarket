import { h } from "preact";
import { useState } from "preact/hooks";
import { ContractProvider } from "../components/ContractContext";
import { Navigation } from "../components/Navigation";
import { MyPlanetsView } from "./MyPlanetsView";
import { MyListingsView } from "./MyListingsView";
import { MyOrdersView } from "./MyOrdersView";
import { MarketView } from "./MarketView";
import { GuideView } from "./GuideView";
import { MySignerProvider } from "../components/SignerContext";
import { MyTransactionProvider } from "../components/MyTransactionContext";
import { ListingsProvider } from "../components/MyListingsContext";
import { ConnectionProvider } from "../components/ConnectionContext";
import { AppViewProps } from "../typings/typings";

export function AppView ({ contract, signer, txs, listings, connection }: AppViewProps) {
	const [ activeTabId, setActiveTab ] = useState(0);

	return (
		// contractsProvider has `game` and `market` contracts
		<ContractProvider value={contract}>
			<ConnectionProvider value={connection}>
				<MySignerProvider signer={signer}>
					<MyTransactionProvider txs={txs}>
						<ListingsProvider listings={listings}>
							<Navigation
								tabs={[
									{ name: "Market", TabContent: MarketView },
									{ name: "My Listings", TabContent: MyListingsView },
									{ name: "My Orders", TabContent: MyOrdersView },
									{ name: "My Planets", TabContent: MyPlanetsView },
									{ name: "Guide", TabContent: GuideView }
								]}
							/>
						</ListingsProvider>
					</MyTransactionProvider>
				</MySignerProvider>
			</ConnectionProvider>
		</ContractProvider>
	);
}