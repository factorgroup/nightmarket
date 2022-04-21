/**
 * A plugin is a Class with render and destroy methods.
 * Other than that, you are free to do whatever, so be careful!
 */
declare class Readme implements DFPlugin {
    canvas: HTMLCanvasElement;
    /**
     * A constructor can be used to keep track of information.
     */
    constructor();
    /**
     * A plugin's render function is called once.
     * Here, you can insert custom html into a game modal.
     * You render any sort of UI that makes sense for the plugin!
     */
    render(div: HTMLDivElement): Promise<void>;
    /**
     * When this is unloaded, the game calls the destroy method.
     * So you can clean up everything nicely!
     */
    destroy(): void;
}
/**
 * For the game to know about your plugin, you must export it!
 *
 * Use `export default` to expose your plugin Class.
 */
export default Readme;
