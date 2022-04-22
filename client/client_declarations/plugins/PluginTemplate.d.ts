declare class PluginTemplate implements DFPlugin {
    constructor();
    /**
     * Called when plugin is launched with the "run" button.
     */
    render(container: HTMLDivElement): Promise<void>;
    /**
     * Called when plugin modal is closed.
     */
    destroy(): void;
}
/**
 * And don't forget to export it!
 */
export default PluginTemplate;
