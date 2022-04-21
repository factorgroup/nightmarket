import { AttribProps } from '../EngineTypes';
/**
 * Responsible for queuing data about a webgl attribute and then writing to it.
 * Does this by maintaining a persistent AttribArray and WebGLBuffer reference,
 * and then calling bufferData on n vertices at a time. Allows us to upload
 * whole arrays of objects at once, providing speed boost.
 */
export default class AttribManager {
    /**
     * The WebGL rendering context.
     */
    private gl;
    /**
     * AttribProps object for this attribute, containing name, dimension, and more.
     */
    private props;
    /**
     * Attrib loc, returned by gl.getAttribLocation().
     */
    private loc;
    /**
     * The WebGLBuffer associated with this attribute.
     */
    private buffer;
    /**
     * An internally managed AttribArray, which is a typed mutable array.
     */
    private attribArray;
    /**
     * For a given attribute on a program on a context, create an AttribManager.
     * @param gl - The WebGL context to generate this attrib on.
     * @param program - The program corresponding to this attrib.
     * @param props - An AttribProps object, containing the attrib name and other info.
     * @param enable - Should we call gl.enableVertexAttribArray? (default true)
     */
    constructor(gl: WebGL2RenderingContext, program: WebGLProgram, props: AttribProps, enable?: boolean);
    /**
     * Set vertices starting from vertex #idx - writing to vertex #0 will write to the first vertex.
     *
     * Note that you can write multiple vertices at once - if you write a 6-long array into a 2D
     * attribute at vertex 0, you will write 3 vertices at once.
     *
     * @param els - The data to write into the vertices.
     * @param idx - The starting vertex # to write to.
     */
    setVertex(els: number[], idx: number): void;
    /**
     * Send vertices [0, n - 1] through the buffer - bufferData(1) will send one vertex (only vertex #0)
     * @param n The number of vertices to send through the buffer.
     */
    bufferData(n: number): void;
}
