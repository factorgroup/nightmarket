declare class Noise {
    noise: any;
    static instance: Noise;
    static initialize(): Noise;
    static getInstance(): Noise;
    simplex2(x: any, y: any): number;
    constructor();
}
export default Noise;
