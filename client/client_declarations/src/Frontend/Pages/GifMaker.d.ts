/// <reference types="react" />
import { ArtifactFileColor } from '@darkforest_eth/gamelogic';
export declare const GIF_ARTIFACT_COLOR: ArtifactFileColor;
/**
 * Entrypoint for gif and sprite generation, accessed via `yarn run gifs`.
 * Wait a second or so for the textures to get loaded, then click the buttons to download files as a zip.
 * gifs are saved as 60fps webm, and can take a while - open the console to see progress (logged verbosely)
 */
export declare function GifMaker(): JSX.Element;
