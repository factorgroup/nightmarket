import { createContext } from "preact";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { SignerProviderProps } from "../typings/typings";

export const SignerContext = createContext({
    address: '',
    signer: {}
});

export const MySignerProvider = (props: SignerProviderProps) => {
    const [ address, setAddress ] = useState<string>('');
    useEffect(() => {
        const setInfos = async () => {
            const address = await props.signer.getAddress();
            setAddress(address);
        };
        setInfos();
    }, [ props.signer ]);

    return (
        <SignerContext.Provider value={{ signer: props.signer, address: address }} children={props.children} />
    );
};