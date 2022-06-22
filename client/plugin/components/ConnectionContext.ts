import EthConnection from "@df_client/src/Backend/Network/EthConnection";
import { createContext } from "preact";

// @ts-ignore createContext(noDefaultValue)
export const ConnectionContext = createContext<EthConnection>();
export const ConnectionProvider = ConnectionContext.Provider;