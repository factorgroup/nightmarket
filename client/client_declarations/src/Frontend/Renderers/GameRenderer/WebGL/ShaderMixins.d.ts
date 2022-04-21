/**
 * these are 'includes' that you can add into shader template strings as in `${include}`
 */
export declare class ShaderMixins {
    static PI: string;
    static desaturate: string;
    /** 1 minus source alpha blend mode */
    static blend: string;
    static noiseVec3: string;
    static radAtAngle: string;
    static mod2pi: string;
    static modFloat: string;
    /** Good atan that returns [0, 2Pi) */
    static arcTan: string;
    /** Fade out the last `tail * 100` percent of `value` to 0 - a plateau with a steep dropoff */
    static fade: string;
    /**
     * 4d simplex noise - `snoise(vec4)`, seems to return `[-1, 1]`
     * https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
     */
    static simplex4: string;
    static seededRandom: string;
    static seededRandomVec2: string;
    static invertColors: string;
    static hueShift: string;
    static invertBrightness: string;
}
