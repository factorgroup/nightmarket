import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { NumInput, TextInput } from "../components/Input";
import { Button } from "../components/Button";
import { useMarket } from "../hooks/use-market";
import { genListProofArgs } from "../helpers/genProofArgs";
// import { getListProof } from "../helpers/snarks";
import { passwordToKey, genRandomNonce } from "../helpers/utils";

// @dev: bignumber has to be converted to strings before setting react state
export function SellPlanetView({ planet, setActivePlanet }) {
	// This component rerenders upon each input
	console.log("In SellPlanetView");
	// hooks
	const { list } = useMarket();

	const [proof, setProof] = useState([] as string[]); //// An array of bigNumbers, hence `as any`
	const [price, setPrice] = useState(0);
	const [escrowTime, setEscrowTime] = useState(0);
	const [confirm, setConfirm] = useState(false);
	const [error, setError] = useState();
	const [nonce, setNonce] = useState("");
	const [password, setPassword] = useState("");
	const [key, setKey] = useState([] as BigInt[]); // two BigNumbers

	// Triggers proof generation
	const onClickConfirm = async () => {
		setNonce(genRandomNonce());
		setKey(passwordToKey(password));
		const inputs = genListProofArgs(planet, nonce, key);
		console.log("Confirm list: computed inputs are: ");
		// console.log(inputs);
		// setProof(await getListProof(inputs));
		setConfirm(true);
	}

	const onClickList = () => {
		// todo fix this, it logs this trx into myTrxContext
		// TODO save the pw in trx context?
		// list(proof, utils.formatUnits(price, "eth"), escrowTime).then().catch(setError);
		setActivePlanet(false);
		console.log("List: listing it now!!");
	}

	// returns false if invalid
	const validateForm = () => {
		return (
			// TODO things are smaller than bignumber
			true
		)
	}

	return (
		<div
			style={{
			}}
		>
			<div>
				<label for="price">Price (in Eth):</label>
			</div>
			<div>
				<NumInput
					name="price"
					type="number"
					value={price}
					onChange={setPrice}
				/>
				{/* TODO convert to gwei */}
			</div>

			<div>
				<label>Escrow time (in blocks)</label>
			</div>
			<div>
				<NumInput
					name="escrowTime"
					type="number"
					value={escrowTime}
					onChange={setEscrowTime}
				/>
				{/* TODO estimate how many minutes */}
			</div>

			<div>
				<label>A unique password (write it down and dont resuse!!)</label>
			</div>
			<div>
				<TextInput
					name="password"
					type="string"
					value={password}
					placeholder={"your password"}
					onChange={setPassword}
				/>
			</div>
			<div>
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
			</div>

			<div>Listing proof parameters:</div>
			<div>
				Proof: {proof}
			</div>
			<div>
				Nonce: {nonce}
			</div>
			<div>
				Key: {JSON.stringify(key)}
			</div>
		</div>

	)
}