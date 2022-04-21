/// <reference types="node" />
import { EventEmitter } from "events";
export declare const enum UIEmitterEvent {
    GamePlanetSelected = "GamePlanetSelected",
    CenterPlanet = "CenterPlanet",
    WindowResize = "WindowResize",
    UIChange = "UIChange",
    CanvasMouseDown = "CanvasMouseDown",
    CanvasMouseMove = "CanvasMouseMove",
    CanvasMouseUp = "CanvasMouseUp",
    CanvasMouseOut = "CanvasMouseOut",
    CanvasScroll = "CanvasScroll",
    WorldMouseDown = "WorldMouseDown",
    WorldMouseClick = "WorldMouseClick",
    WorldMouseMove = "WorldMouseMove",
    WorldMouseUp = "WorldMouseUp",
    WorldMouseOut = "WorldMouseOut",
    ZoomIn = "ZoomIn",
    ZoomOut = "ZoomOut",
    SendInitiated = "SendInitiated",
    SendCancelled = "SendCancelled",
    SendCompleted = "SendCompleted",
    DepositArtifact = "DepositArtifact",
    DepositToPlanet = "DepositToPlanet",
    SelectArtifact = "SelectArtifact",
    ShowArtifact = "ShowArtifact"
}
declare class UIEmitter extends EventEmitter {
    static instance: UIEmitter;
    constructor();
    static getInstance(): UIEmitter;
    static initialize(): UIEmitter;
}
export default UIEmitter;
