import { AttribProps } from '../EngineTypes';
export declare const glassPosProps: AttribProps;
export declare const glassTexProps: AttribProps;
export declare type GlassUniforms = {
    matrix: WebGLUniformLocation | null;
    texture: WebGLUniformLocation | null;
};
export declare type GlassProgramWithUniforms = {
    program: WebGLProgram;
    uniforms: GlassUniforms;
};
export declare const getGlassProgramAndUniforms: (gl: WebGL2RenderingContext) => GlassProgramWithUniforms;
