export default class ProgramUtils {
    static createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null;
    static createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragShader: WebGLShader): WebGLProgram | null;
    static programFromSources(gl: WebGL2RenderingContext, vertexShaderSource: string, fragShaderSource: string): WebGLProgram | null;
}
