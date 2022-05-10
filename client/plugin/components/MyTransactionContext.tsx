import { h } from "preact";
import { createContext } from "preact";
import { useState } from "preact/hooks";

// A session history of users on chain transactions
// Can be of type `list` `ask` or `sale`
export const MyTransactionContext = createContext([] as any);

export const MyTransactionProvider = (props) => {
	const [transactions, setTransactions] = useState([] as transaction);

	return (
		<MyTransactionContext.Provider
			value={{ transactions, setTransactions }}
			children={props.children}
		/>
	);
};

export interface transaction {

};
