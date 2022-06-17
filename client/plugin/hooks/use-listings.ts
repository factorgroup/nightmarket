import { useContext } from "preact/hooks";
import { ListingsContext } from "../components/MyListingsContext";

export const useListings = () => useContext(ListingsContext);
