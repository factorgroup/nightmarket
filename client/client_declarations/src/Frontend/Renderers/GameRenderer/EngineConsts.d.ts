import { RGBAVec, RGBVec } from './EngineTypes';
export declare const engineConsts: {
    fontStyle: string;
    dashLength: number;
    planet: {
        maxRadius: number;
    };
    glyphs: {
        glyphW: number;
        glyphH: number;
        rowL: number;
        canvasDim: number;
        scale: number;
    };
    colors: {
        artifacts: {
            shine: RGBVec;
            trim: RGBVec;
        };
        gold: RGBVec;
        barbs: RGBVec;
        barbsA: RGBAVec;
        white: RGBVec;
        whiteA: RGBAVec;
        purpleA: RGBAVec;
        purple: RGBVec;
        red: RGBVec;
        redA: RGBAVec;
        range: {
            dash: RGBVec;
            energy: RGBVec;
        };
        voyage: {
            enemy: RGBVec;
            enemyA: RGBAVec;
            mine: RGBVec;
            mineA: RGBAVec;
        };
        bonus: {
            energyCap: RGBVec;
            energyGro: RGBVec;
            speed: RGBVec;
            range: RGBVec;
            defense: RGBVec;
        };
        belt: {
            silver: RGBVec;
            speed: RGBVec;
            range: RGBVec;
            defense: RGBVec;
        };
    };
};
