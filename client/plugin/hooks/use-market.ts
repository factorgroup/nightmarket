import { useContract } from "./use-contract";
import { useTransactions } from "./use-mytransactions";
import { encrypt } from "../helpers/poseidon";
import { getSaleProof } from "client/plugin/helpers/snarks";

// Notice functions are a property inside of useMarket() component
// TODO: it should add to mytransactions history
export function useMarket () {

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

	const delist = (listingId: number) => {
		return market.functions.delist(listingId, {
			gasLimit: 1000000,
		}
		).then(
			(tx) => console.log(`Delisting ${listingId}`)
		).catch(
			(e) => console.log(`Error delisting ${listingId}, ${e}`)
		);
	};

	const sale = async (listingId, orderId, key, sharedKey, nonce, keyCommitment, sharedKeyCommitment) => {
		const receiptId = encrypt(key, [ sharedKey.x, sharedKey.y ], nonce);
		const saleProofArgs = {
			receipt_id: receiptId,
			nonce: nonce.toString(),
			key_commitment: keyCommitment.toString(),
			shared_key_commitment: sharedKeyCommitment.toString(),
			shared_key: [ sharedKey.x, sharedKey.y ],
			key: key
		};
		const saleProof = await getSaleProof(saleProofArgs);
		const sale = await market.sale(...saleProof, listingId, orderId, {
			gasLimit: 1000000,
		});
		console.log(`sale tx: `, sale);
	}

	return {
		list,
		delist,
		sale
	};
}