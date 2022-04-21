import { AttribType, UniformType } from '../EngineTypes';
export declare const RING_PROGRAM_DEFINITION: {
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
export declare type RingProps = [number, number, number];
export declare const propsFromIdx: (idx: number) => RingProps;
