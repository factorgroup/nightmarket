import { AttribType, UniformType } from '../EngineTypes';
export declare const SPRITE_PROGRAM_DEFINITION: {
    uniforms: {
        matrix: {
            name: string;
            type: UniformType;
        };
        texture: {
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
        texcoord: {
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
        shine: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        invert: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        mythic: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
    };
    vertexShader: string;
    fragmentShader: string;
};
