import { AttribType, UniformType } from '../EngineTypes';
export declare const RUINS_PROGRAM_DEFINITION: {
    uniforms: {
        matrix: {
            name: string;
            type: UniformType;
        };
        time: {
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
        rectPos: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        color: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        weights: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        props: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
    };
    vertexShader: string;
    fragmentShader: string;
};
