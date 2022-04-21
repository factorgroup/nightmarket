import { AttribType, UniformType } from '../EngineTypes';
export declare const ASTEROID_PROGRAM_DEFINITION: {
    uniforms: {
        matrix: {
            name: string;
            type: UniformType;
        };
        now: {
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
        color: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        radius: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        theta: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        seed: {
            dim: number;
            name: string;
            type: AttribType;
            normalize: boolean;
        };
    };
    vertexShader: string;
    fragmentShader: string;
};
