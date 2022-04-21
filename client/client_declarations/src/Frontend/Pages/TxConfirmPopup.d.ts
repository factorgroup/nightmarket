/// <reference types="react" />
import { RouteComponentProps } from 'react-router-dom';
export declare function TxConfirmPopup({ match, }: RouteComponentProps<{
    contract: string;
    addr: string;
    actionId: string;
    balance: string;
    method: string;
}>): JSX.Element;
