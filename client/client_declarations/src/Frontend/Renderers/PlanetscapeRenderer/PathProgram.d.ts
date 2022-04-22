import { AttribProps } from '../GameRenderer/EngineTypes';
export declare const scapePosProps: AttribProps;
export declare const scapeColorProps: AttribProps;
export declare type ScapeUniforms = {
    matrix: WebGLUniformLocation | null;
};
export declare type PathProgramWithUniforms = {
    program: WebGLProgram;
    uniforms: ScapeUniforms;
};
export declare const getPathProgramAndUniforms: (gl: WebGL2RenderingContext) => PathProgramWithUniforms;
