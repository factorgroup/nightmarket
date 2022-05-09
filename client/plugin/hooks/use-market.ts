import { useState, useEffect } from "preact/hooks";
import { useContract } from "./use-contract";
import { useTransactions } from "./use-mytransactions";

// Notice functions are a property inside of useMarket() component
// TODO: it should add to mytransactions history
export function useMarket() {
	// @ts-expect-error
	const { market } = useContract();
	const { myTransactions, setTransactions } = useTransactions();

	const list = (proof, price, escrowTime, password) => {
		console.log("useMarket hook: listing coordinate with args: ");
		console.log(proof);
		console.log("price");
		console.log(price);
		console.log("escrowTime");
		console.log(escrowTime);
		return market.list(
			...proof, price, escrowTime, {
			gasLimit: 1000000,
		}
		).then(
			(res) => {
				console.log("contract.list response");
				console.log(res); //res.? is the response i think.. 0x00 hex. listingid index.
				console.log("Updated: myTransactins context");
				// myTransactions.addTransaction(password);
				// console.log(myTransactions);
			}
		).catch((e) => {
			console.log("useMarket hook: there is a problem");
			console.log(e);
		});
	};

	const delist = (planet) => {
		console.log("delisting planet....");
	};

	return {
		list,
	}
}