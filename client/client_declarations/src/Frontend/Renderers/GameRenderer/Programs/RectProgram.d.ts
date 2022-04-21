import { AttribType, UniformType } from '../EngineTypes';
export declare const RECT_PROGRAM_DEFINITION: {
    uniforms: {
        matrix: {
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
        rectPos: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        strokeX: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        strokeY: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
    };
    vertexShader: string;
    fragmentShader: string;
};
