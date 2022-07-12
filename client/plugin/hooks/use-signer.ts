import { useContext } from "preact/hooks";
import { SignerContext } from "../components/SignerContext";

export const useSigner = () => useContext(SignerContext);
