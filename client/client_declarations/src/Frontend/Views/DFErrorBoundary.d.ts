import React from 'react';
export declare class DFErrorBoundary extends React.Component<unknown, {
    hasError: boolean;
}> {
    constructor(props: unknown);
    static getDerivedStateFromError(_error: Error): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, _errorInfo: React.ErrorInfo): void;
    render(): React.ReactNode;
}
