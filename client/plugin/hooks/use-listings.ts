import { useContext } from "preact/hooks";
import { MyListingsContext } from "../components/MyListingsContext";

export const useListings = () => useContext(MyListingsContext);
