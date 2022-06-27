import { ComponentChildren, h } from "preact";
import { createContext } from "preact";
import { useState } from "preact/hooks";
import { useContract } from "../hooks/use-contract";
import { useSigner } from "../hooks/use-signer";
import { ActiveSigner } from "../typings/typings";
import { Event as EthersEvent } from "ethers";

// A session history of users on chain transactions
// Can be of type `list` `ask` or `sale`
export const MyTransactionContext = createContext([] as any);

type MyTransactionProviderProps = {
	children: ComponentChildren;
	txs: EthersEvent[];
};

export const MyTransactionProvider = (props: MyTransactionProviderProps) => {
	const [ transactions, setTransactions ] = useState<EthersEvent[]>(props.txs);
	const { market } = useContract();
	const signer = useSigner() as ActiveSigner;

	return (
		<MyTransactionContext.Provider
			value={{ transactions, setTransactions }}
			children={props.children}
		/>
	);
};