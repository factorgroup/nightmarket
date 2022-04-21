declare class RageCage implements DFPlugin {
    img: HTMLImageElement;
    loaded: boolean;
    /**
     * As you saw in the README plugin, you can render
     * arbitrary HTML UI into a Dark Forest modal.
     */
    render(div: HTMLDivElement): Promise<void>;
    /**
     * In addition to rendering HTML UI into a div, plugins
     * can draw directly onto the game UI. This function is
     * optional, but if it exists, it is called in sync with
     * the rest of the game, and allows you to draw onto an
     * HTML5 canvas that lays on top of the rest of the game.
     *
     * In the example below, we render an image on top of every
     * planet.
     *
     * ctx is an instance of CanvasRenderingContext2D.
     */
    draw(ctx: CanvasRenderingContext2D): void;
}
export default RageCage;
