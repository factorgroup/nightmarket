import { mat3, mat4 } from 'gl-matrix';
export declare enum AttribType {
    Float,
    UByte
}
export declare enum DrawMode {
    Triangles,
    Lines,
    Points
}
export declare type AttribProps = {
    dim: number;
    type: AttribType;
    normalize: boolean;
    name: string;
};
export declare const enum UniformType {
    Mat4 = 0,
    Mat3 = 1,
    UByte = 2,
    Float = 3,
    Texture = 4,
    Vec3 = 5
}
export declare type Vec3 = [number, number, number];
export declare type UniformJSType = mat4 | mat3 | number | Vec3;
export declare type UniformProps = {
    name: string;
    type: UniformType;
};
export declare type RGBVec = [number, number, number];
export declare type RGBAVec = [number, number, number, number];
export declare type Translation = {
    x: number;
    y: number;
};
export declare type Scaling = {
    x: number;
    y: number;
};
export declare type HSLVec = readonly [number, number, number];
export declare const enum TextAlign {
    Left = 0,
    Center = 0.5,
    Right = 1
}
export declare const enum TextAnchor {
    Top = 0,
    Middle = 0.5,
    Bottom = 1
}
export declare const enum RenderZIndex {
    Background = 0,
    Voyages = -1,
    Planets = -10,
    Text = -11,
    UI = -12,
    DEFAULT = -98,
    MAX = -99
}
