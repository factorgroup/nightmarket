import { useContext } from "preact/hooks";
import { MyTransactionContext } from "../components/MyTransactionContext";

export const useTransactions = () => {
	const { myTransactions, setTransactions } = useContext(MyTransactionContext);

	return {
		myTransactions,
		setTransactions,
		addTransaction: (a) => setTransactions([...myTransactions, a]),
		// Not sure I need this
		isTrxPending: (a) => myTransactions.map((b) => b.id).includes(a.id),
	};
};
