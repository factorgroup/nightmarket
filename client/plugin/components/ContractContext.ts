import { createContext } from "preact";

// @ts-ignore createContext(noDefaultValue) is fine
export const ContractContext = createContext<{ market: Contract; }>({});
export const ContractProvider = ContractContext.Provider;
