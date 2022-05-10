import { useContext } from "preact/hooks";
import { MyTransactionContext } from "../components/MyTransactionContext";

export const useTransactions = () => {
	const { myTransactions, setTransactions } = useContext(MyTransactionContext);

	return {
		myTransactions,
		setTransactions,
		addTransaction: (a) => setTransactions([...myTransactions, a]),
		isTransactionPending: (a) => myTransactions.map((b) => b.id).includes(a.id),
	};
};