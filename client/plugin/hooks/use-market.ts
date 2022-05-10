import { useState, useEffect } from "preact/hooks";
import { useContract } from "./use-contract";
import { useTransactions } from "./use-mytransactions";
import { POLL_INTERVAL } from "../helpers/constants";

// Notice functions are a property inside of useMarket() component
// TODO: it should add to mytransactions history
export function useMarket() {
	// @ts-expect-error
	const { market } = useContract();
	// Tracks context on my pending transactions, not implemented.
	const { myTransactions, setTransactions } = useTransactions();

	// Contract states (stores all listings, views are filtered for user)
	const [listings, setListings] = useState([]);


	const list = (proof, price, escrowTime, password) => {
		console.log("useMarket hook: listing coordinate with args: ");
		console.log(proof);
		console.log("price");
		console.log(price);
		console.log("escrowTime");
		console.log(escrowTime);
		return market.list(
			...proof, price, escrowTime, {
			gasLimit: 700000, // expected: 533k gas
		}
		).then(
			(res) => {
				console.log("contract.list response");
				console.log(res); //res.? is the response i think.. 0x00 hex. listingid index.
				console.log("Updated: myTransactions context");
				// TODO: add to pending trx
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

	// Gets total listings
	// Fills listings[] with listings
	const fetchMarket = () =>
		market
			.numListings()
			.then((i) => {
				console.log("numListings resposne:");
				console.log(i);
				return Promise.all(
					Array(i.toNumber()).fill(0).map(async (i) =>
						market
							.listings(i)
							.then(([seller, keyCommitment, price, escrowTime, numOrders, isActive, orders]) => {
								console.log("received 1 listing");
								return {
									seller,
									keyCommitment,
									price,
									escrowTime,
									numOrders,
									isActive
								}
							})
							.catch((e) => console.log(e))
					)
				)
			})
			.then((res) => {
				console.log("final listings array");
				console.log(res);
				setListings(res);
			})
			.then()
			.catch((e) => console.log(e));

	useEffect(() => {
		fetchMarket();
		const poll = setInterval(fetchMarket, POLL_INTERVAL * 6); // fetch every 30s
		return () => clearInterval(poll);
	}, []);

	return {
		listings,
		list,
	}
}