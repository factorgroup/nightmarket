import React from 'react';
interface CornerProps {
    children: React.ReactNode;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    style?: React.CSSProperties;
}
export declare function Corner({ children, style, top, bottom, left, right, }: CornerProps): JSX.Element;
export {};
