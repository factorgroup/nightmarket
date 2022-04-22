export declare const TOOLTIP_SLOW = 1000;
export declare function Hoverable({ children, hoverContents, quick, hoverDelay, }: {
    children: JSX.Element | JSX.Element[];
    hoverContents: () => JSX.Element;
    quick?: boolean;
    hoverDelay?: number;
}): JSX.Element;
