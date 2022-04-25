import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { NumInput, TextInput } from "../components/Input";
import { Button } from "../components/Button";
import { useMarket } from "../hooks/use-market";
// import { genListProofArgs } from "../helpers/genProofArgs";
// import { getListProof } from "../helpers/snarks";
// import { passwordToKey, genRandomNonce } from "../helpers/utils";

// @ts-ignore
// import { utils } from 'https://cdn.skypack.dev/ethers';

export function SellPlanetView({ planet, setActivePlanet }) {
	// hooks
	const { list } = useMarket();

	const [proof, setProof] = useState([] as any); //// An array of bigNumbers, hence `as any`
	const [price, setPrice] = useState(0);
	const [escrowTime, setEscrowTime] = useState(0);
	const [confirm, setConfirm] = useState(false);
	const [error, setError] = useState();
	// const [nonce, setNonce] = useState(genRandomNonce());
	const [nonce, setNonce] = useState(0);
	const [password, setPassword] = useState("");
	const [key, setKey] = useState([] as any); // two BigNumbers
	setPassword((password) => {
		// setKey(passwordToKey(password));
		setKey([0, 0]);
		return password
	})

	// Triggers proof generation
	const onClickConfirm = async () => {
		// const inputs = genListProofArgs(planet, nonce, key);
		console.log("inputs are: ");
		// console.log(inputs);
		// setProof(await getListProof(inputs));
		setConfirm(true);
	}

	const onClickList = () => {
		// todo fix this, it logs this trx into myTrxContext
		// TODO save the pw in trx context?
		// list(proof, utils.formatUnits(price, "eth"), escrowTime).then().catch(setError);
		console.log("listing it now!!");
	}

	// returns false if invalid
	const validateForm = () => {
		return (
			// TODO things are smaller than bignumber
			true
		)
	}

	return (
		<div>
			<div>
				nonce: {nonce}
			</div>
			<div>
				password generated key: {key}
			</div>
			<div>
				proof: {proof}
			</div>
		</div>

	)
}