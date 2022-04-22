import { PluginId } from '@darkforest_eth/types';
/**
 * This interface represents an embedded plugin, which is stored in `embedded_plugins/`.
 */
export interface EmbeddedPlugin {
    id: PluginId;
    name: string;
    code: string;
}
export declare function getEmbeddedPlugins(isAdmin: boolean): {
    id: PluginId;
    name: string;
    code: string;
}[];
