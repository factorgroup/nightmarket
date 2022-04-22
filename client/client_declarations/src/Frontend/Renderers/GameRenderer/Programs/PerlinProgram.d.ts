import { AttribType, UniformType } from '../EngineTypes';
export declare const PERLIN_PROGRAM_DEFINITION: {
    uniforms: {
        matrix: {
            name: string;
            type: UniformType;
        };
        thresholds: {
            name: string;
            type: UniformType;
        };
        lengthScale: {
            name: string;
            type: UniformType;
        };
    };
    attribs: {
        position: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        worldCoords: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        p0topGrad: {
            name: string;
            dim: number;
            type: AttribType;
            normalize: boolean;
        };
        p0botGrad: {
            name: string;
            dim: number;
            type: AttribType;
            normalize: boolean;
        };
        p1topGrad: {
            name: string;
            dim: number;
            type: AttribType;
            normalize: boolean;
        };
        p1botGrad: {
            name: string;
            dim: number;
            type: AttribType;
            normalize: boolean;
        };
        p2topGrad: {
            name: string;
            dim: number;
            type: AttribType;
            normalize: boolean;
        };
        p2botGrad: {
            name: string;
            dim: number;
            type: AttribType;
            normalize: boolean;
        };
    };
    vertexShader: string;
    fragmentShader: string;
};
