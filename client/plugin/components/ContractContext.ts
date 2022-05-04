import { createContext } from "preact";

// @ts-ignore createContext(noDefaultValue) is fine
export const ContractContext = createContext();
export const ContractProvider = ContractContext.Provider;
