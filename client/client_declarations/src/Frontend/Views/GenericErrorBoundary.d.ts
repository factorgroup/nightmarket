import React from 'react';
interface GenericErrorBoundaryProps {
    errorMessage: string;
}
export declare class GenericErrorBoundary extends React.Component<GenericErrorBoundaryProps, {
    hasError: boolean;
}> {
    constructor(props: GenericErrorBoundaryProps);
    static getDerivedStateFromError(_error: Error): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, _errorInfo: React.ErrorInfo): void;
    render(): React.ReactNode;
}
export {};
