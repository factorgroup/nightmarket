import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { NumInput, TextInput } from "../components/Input";
import { Button } from "../components/Button";
import { useMarket } from "../hooks/use-market";

import { genListProofArgs } from "../helpers/genProofArgs";
import { getListProof } from "client/util/snarkHelper";
import { passwordToKey, genRandomNonce } from "../helpers/utils";

export function SellPlanetView({ planet, setActivePlanet }) {
	// hooks
	const { list } = useMarket();

	// local state
	const [price, setPrice] = useState(0);
	const [escrowTime, setEscrowTime] = useState(0);

	// Confirm === generateProof
	const [confirm, setConfirm] = useState(false);
	const [error, setError] = useState();

	// Proof input calculations, display the following in ui
	const [nonce, setNonce] = useState(genRandomNonce());

	// pw is used to generate the keypair
	const [password, setPassword] = useState("");
	const [key, setKey] = useState(passwordToKey(password));
	const [proof, setProof] = useState([] as any); //// An array of bigNumbers, hence `as any`

	// Triggers proof generation
	const onClickConfirm = async () => {
		setKey(passwordToKey(password));
		const inputs = genListProofArgs(planet, nonce, key);

		setProof(await getListProof(inputs));
		setConfirm(true);
	}

	const onClickList = () => {
		// todo fix this, it logs this trx into myTrxContext
		// TODO save the pw in trx context?
		// list(proof, price, escrowTime).then().catch(setError);
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
			<label for="price">Price (in Eth):</label>
			<NumInput
				name="price"
				type="number"
				value={price}
				onChange={setPrice}
				style={{ width: "128px" }}
			/>

			<label>Escrow time (in blocks)</label>
			<NumInput
				name="escrowTime"
				type="number"
				value={escrowTime}
				onChange={setEscrowTime}
				style={{ width: "128px" }}
			/>
			{/* TODO estimate how many minutes */}

			<label>Listing unique password (write it down and dont resuse!!)</label>
			<TextInput
				name="paswword"
				type="string"
				value={escrowTime}
				placeholder={"your password"}
				onChange={setPassword}
				style={{ width: "75px" }}
			/>

			<Button
				children={confirm ? "confirm list" : "generate proof"}
				theme={confirm ? "green" : "default"}
				style={{ width: "128px" }}
				// TODO handle the async nature of these buttons
				onClick={confirm ? onClickList : onClickConfirm}
				disabled={!validateForm()}
			/>

			<Button
				theme="red"
				style={{ width: "128px" }}
				children="cancel"
				onClick={() => setActivePlanet(false)}
			/>
			<div>
				{/* TODO add displays here for the proof, key, etc. */}
			</div>

		</div>

	)
}