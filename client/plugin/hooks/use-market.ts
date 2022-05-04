import { useState, useEffect } from "preact/hooks";
import { useContract } from "./use-contract";
import { useTransactions } from "./use-mytransactions";

// TODO: all the helpers here...
// Notice functions are a property inside of useMarket() component
// it should add to mytransactions history
export function useMarket() {
	// @ts-expect-error
	const { market } = useContract();
	const { myTransactions, setTransactions } = useTransactions();

	const list = (proof, price, escrowTime) => {
		return market.list(
			...proof, price, escrowTime
		).then(
			console.log("listing something")
		);
	};

	const delist = (planet) => {
		console.log("delisting planet....");
	};

	return {
		list,
	}
}