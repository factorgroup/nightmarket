import { AttribProps, DrawMode, UniformJSType, UniformProps } from '../EngineTypes';
import AttribManager from './AttribManager';
import { WebGLManager } from './WebGLManager';
declare type UniformData = {
    [key: string]: UniformProps;
};
declare type AttribData = {
    [key: string]: AttribProps;
};
/**
 * An object that describes all of the necessary data to create and manage
 * this program within the renderer.
 */
interface EngineProgramDefinition {
    uniforms: UniformData;
    attribs: AttribData;
    vertexShader: string;
    fragmentShader: string;
}
declare type UniformSetter = (el: UniformJSType) => void;
declare type UniformSetters<T extends EngineProgramDefinition> = {
    [k in keyof T['uniforms']]: UniformSetter;
};
declare type UniformLocs<T extends EngineProgramDefinition> = {
    [k in keyof T['uniforms']]: WebGLUniformLocation;
};
declare type AttribManagers<T extends EngineProgramDefinition> = {
    [k in keyof T['attribs']]: AttribManager;
};
/**
 * Takes in a gl context, program sources (frag and vert shader),
 * and data about attribs / uniforms and provides:
 * - attrib managers
 * - uniform setters
 * - skeleton code for rendering in our engine via `flush()`
 */
export declare class GenericRenderer<T extends EngineProgramDefinition> {
    /** The program corresponding to this renderer. */
    program: WebGLProgram;
    /** A dictionary of uniform setters, keyed by uniform name. */
    uniformSetters: UniformSetters<T>;
    /** A dictionary of attrib managers, keyed by attrib name. */
    attribManagers: AttribManagers<T>;
    /**
     * Uniform data for this program. Typically not used after construction.
     * Kept for use in inherited classes.
     */
    uniformData: UniformData;
    /**
     * Uniform data for this program. Typically not used after construction.
     * Kept for use in inherited classes.
     */
    attribData: AttribData;
    /**
     * Uniform locs for this program. Typically not referenced directly,
     * but rather through generated uniformSetters. Kept for use in inherited classes.
     */
    uniformLocs: UniformLocs<T>;
    /** WebGLManager corresponding to this program. */
    manager: WebGLManager;
    /** The number of queued vertices so far. Used for batch rendering. */
    verts: number;
    /**
     * Create a renderer from a WebGLManager and program data.
     * @param glManager WebGLManager which holds context for rendering this program.
     * @param programData ProgramData describing this program.
     */
    constructor(glManager: WebGLManager, programData: T);
    /**
     * Run by flush(). Override this in child classes. Programs with uniformss
     * should always override this.
     */
    setUniforms(): void;
    /**
     * Draw all buffered vertices to the screen.
     * @param drawMode The drawing mode for the buffered vertices. Default: Triangles.
     */
    flush(drawMode?: DrawMode): void;
}
export {};
