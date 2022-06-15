import { createContext } from "preact";
import { h, ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Signer } from "ethers";

export const SignerContext = createContext({
    address: '',
    signer: {}
});

type SignerProviderProps = {
    children: ComponentChildren;
    signer: Signer;
};

export type ActiveSigner = {
    address: string;
    signer: Signer;
};

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