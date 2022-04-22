/**
 * This file is basically one long wizard incantation to make HMR actually do its job
 *
 * https://github.com/jauco/webpack-hot-module-reload-with-context-example/blob/master/hmr_example.js
 */
import { PluginProcess } from './PluginProcess';
/**
 * This interface represents a local plugin, which is stored in local_plugins/src.
 */
export interface HMRPlugin {
    name: string;
    filename: string;
}
export declare const hmrPlugins$: import("../../Frontend/Utils/Monomitter").Monomitter<HMRPlugin[]>;
export declare function getHmrPlugins(): HMRPlugin[];
export declare function loadLocalPlugin(filename: string): Promise<{
    default: PluginProcess;
}>;
