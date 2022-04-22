import { AttribType, UniformType } from '../EngineTypes';
export declare const MASK_PROGRAM_DEFINITION: {
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
    };
    vertexShader: string;
    fragmentShader: string;
};
