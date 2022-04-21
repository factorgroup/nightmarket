import React from 'react';
interface ButtonProps {
    onClick?(event: React.MouseEvent<HTMLButtonElement>): Promise<void> | void;
    children: React.ReactNode;
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
}
export default function Button({ children, onClick: _onClick, style, hoverStyle, ...rest }: ButtonProps): JSX.Element;
export {};
