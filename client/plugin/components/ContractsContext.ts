import { createContext } from "preact";

// @ts-ignore createContext(noDefaultValue) is fine
export const ContractsContext = createContext();
export const ContractsProvider = ContractsContext.Provider;
