import { AttribType, UniformType } from '../EngineTypes';
export declare const SPACETIMERIP_PROGRAM_DEFINITION: {
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
        inColor1: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        inColor2: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
        inColor3: {
            dim: number;
            type: AttribType;
            normalize: boolean;
            name: string;
        };
    };
    vertexShader: string;
    fragmentShader: string;
};
