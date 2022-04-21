import React from 'react';
export interface LoadingBarHandle {
    setFractionCompleted: (fractionCompleted: number) => void;
}
interface LoadingBarProps {
    prettyEntityName: string;
}
export declare const TextLoadingBar: React.ForwardRefExoticComponent<LoadingBarProps & React.RefAttributes<LoadingBarHandle | undefined>>;
export declare function TextLoadingBarImpl({ prettyEntityName }: LoadingBarProps, ref: React.Ref<LoadingBarHandle>): JSX.Element;
export {};
