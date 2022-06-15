import { Contract } from "ethers";
import { useContext } from "preact/hooks";
import { ContractContext } from "../components/ContractContext";

export const useContract = () => useContext(ContractContext) as { market: Contract; };
