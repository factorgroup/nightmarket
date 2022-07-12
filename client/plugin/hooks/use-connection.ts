import { useContext } from "preact/hooks";
import { ConnectionContext } from "../components/ConnectionContext";

export const useConnection = () => useContext(ConnectionContext);