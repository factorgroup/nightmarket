declare class ArtifactsFinder implements DFPlugin {
    planetList: HTMLDivElement;
    renderPlanets: () => void;
    render(container: HTMLDivElement): Promise<void>;
}
/**
 * And don't forget to export it!
 */
export default ArtifactsFinder;
