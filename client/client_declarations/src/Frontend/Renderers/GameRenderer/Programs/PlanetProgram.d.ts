import { Planet } from '@darkforest_eth/types';
import { AttribType, UniformType } from '../EngineTypes';
export declare const PLANET_PROGRAM_DEFINITION: {
    uniforms: {
        matrix: {
            name: string;
            type: UniformType;
        };
        timeMatrix: {
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
            name: string;
            type: AttribType;
            normalize: boolean;
        };
        rectPos: {
            dim: number;
            name: string;
            type: AttribType;
            normalize: boolean;
        };
        color: {
            dim: number;
            name: string;
            type: AttribType;
            normalize: boolean;
        };
        color2: {
            dim: number;
            name: string;
            type: AttribType;
            normalize: boolean;
        };
        color3: {
            dim: number;
            name: string;
            type: AttribType;
            normalize: boolean;
        };
        props: {
            dim: number;
            name: string;
            type: AttribType;
            normalize: boolean;
        };
        props2: {
            dim: number;
            name: string;
            type: AttribType;
            normalize: boolean;
        };
    };
    vertexShader: string;
    fragmentShader: string;
};
export declare const octavesFromPlanet: (p: Planet) => number;
export declare const cloudsFromPlanet: (p: Planet) => number;
export declare const morphFromPlanet: (p: Planet) => number;
export declare function distortFromPlanet(p: Planet): number;
export declare const beachFromPlanet: (p: Planet) => number;
export declare const propsFromPlanet: (p: Planet) => [number, number, number, number];
