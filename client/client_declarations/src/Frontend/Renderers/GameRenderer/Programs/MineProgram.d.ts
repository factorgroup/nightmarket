import { AttribType, UniformType } from '../EngineTypes';
export declare const MINE_PROGRAM_DEFINITION: {
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
        seed: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        offset: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
    };
    vertexShader: string;
    fragmentShader: string;
};
