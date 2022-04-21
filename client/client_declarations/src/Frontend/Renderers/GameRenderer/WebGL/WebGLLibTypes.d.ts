declare type DataType = Float32Array;
export interface Uniforms {
    [k: string]: DataType;
}
export declare type UniformSetters<U extends Uniforms> = {
    [key in keyof U]: (arg: U[key]) => void;
};
export interface Attributes {
    [k: string]: DataType;
}
export declare type AttributeSetters<U extends Attributes> = {
    [key in keyof U]: (arg: U[key]) => void;
};
export declare type CompiledProgram<U extends Uniforms> = {
    program: WebGLProgram;
    setUniform: UniformSetters<U>;
};
export declare type ProgramInfo = {
    vertexShader: string;
    fragShader: string;
    uniforms: Uniforms;
};
export {};
