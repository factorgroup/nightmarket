import { LocatablePlanet, LocationId } from '@darkforest_eth/types';
import { PlanetRenderInfo } from '../../../../Backend/GameLogic/ViewportEntities';
import Renderer from '../Renderer';
/**
 * this guy is always going to call things in worldcoords, we'll convert them
 * to CanvasCoords. responsible for rendering planets by calling primitive renderers
 */
export default class PlanetRenderManager {
    renderer: Renderer;
    constructor(renderer: Renderer);
    queueLocation(renderInfo: PlanetRenderInfo, now: number, highPerfMode: boolean): void;
    private queueArtifactsAroundPlanet;
    private drawPlanetMessages;
    private queueArtifactIcon;
    private queuePlanetSilverText;
    private getLockedEnergy;
    private getMouseAtk;
    private queueRings;
    private queuePlanetBody;
    private queueBlackDomain;
    private queueAsteroids;
    private queueHat;
    private queuePlanetEnergyText;
    /**
     * Renders rings around planet that show how far sending the given percentage of this planet's
     * energy would be able to travel.
     */
    drawRangeAtPercent(planet: LocatablePlanet, pct: number): void;
    /**
     * Renders three rings around the planet that show the player how far this planet can attack.
     */
    queueRangeRings(planet: LocatablePlanet): void;
    queuePlanets(cachedPlanets: Map<LocationId, PlanetRenderInfo>, now: number, highPerfMode: boolean): void;
    flush(): void;
}
