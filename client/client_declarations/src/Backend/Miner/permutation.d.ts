import { Rectangle, WorldLocation } from '@darkforest_eth/types';
export declare const getPlanetLocations: (spaceTypeKey: number, biomebaseKey: number, perlinLengthScale: number, perlinMirrorX: boolean, perlinMirrorY: boolean) => (chunkFootprint: Rectangle, planetRarity: number) => WorldLocation[];
