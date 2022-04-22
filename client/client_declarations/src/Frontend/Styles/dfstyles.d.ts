/// <reference types="react" />
export declare const ARTIFACT_ROW_H = 48;
export declare const SPACE_TYPE_COLORS: {
    readonly [x: number]: "rgb(0, 20.4, 81.6)" | "rgb(0, 5.4, 43.35)" | "rgb(2.04, 0, 6.12)" | "rgb(0, 37, 1)";
};
declare const dfstyles: {
    colors: {
        text: string;
        textLight: string;
        subtext: string;
        subbertext: string;
        subbesttext: string;
        blueBackground: string;
        background: string;
        backgrounddark: string;
        backgroundlight: string;
        backgroundlighter: string;
        dfblue: string;
        border: string;
        borderDark: string;
        borderDarker: string;
        borderDarkest: string;
        dfgreen: string;
        dfgreendark: string;
        dfgreenlight: string;
        dfred: string;
        dfyellow: string;
        dfpurple: string;
        dfwhite: string;
        dforange: string;
        artifactBackground: string;
        icons: {
            twitter: string;
            github: string;
            discord: string;
            email: string;
            blog: string;
        };
    };
    borderRadius: string;
    fontSize: string;
    fontSizeS: string;
    fontSizeXS: string;
    fontH1: string;
    fontH1S: string;
    fontH2: string;
    titleFont: string;
    screenSizeS: string;
    game: {
        terminalWidth: string;
        fontSize: string;
        canvasbg: string;
        rangecolors: {
            dash: string;
            dashenergy: string;
            colorenergy: string;
            color100: string;
            color50: string;
            color25: string;
        };
        bonuscolors: {
            energyCap: string;
            speed: string;
            def: string;
            spaceJunk: string;
            energyGro: string;
            range: string;
        };
        toolbarHeight: string;
        terminalFontSize: string;
        styles: {
            active: string;
            animProps: string;
        };
    };
    prefabs: {
        noselect: import("styled-components").FlattenSimpleInterpolation;
    };
};
export declare const snips: {
    bigPadding: import("styled-components").FlattenSimpleInterpolation;
    defaultModalWidth: import("styled-components").FlattenSimpleInterpolation;
    defaultBackground: string;
    roundedBorders: string;
    roundedBordersWithEdge: import("styled-components").FlattenSimpleInterpolation;
    absoluteTopLeft: import("styled-components").FlattenSimpleInterpolation;
    pane: string;
    destroyedBackground: CSSStyleDeclaration & import("react").CSSProperties;
};
export default dfstyles;
