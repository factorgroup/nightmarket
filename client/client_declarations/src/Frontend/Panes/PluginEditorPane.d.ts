/// <reference types="react" />
import { PluginId } from '@darkforest_eth/types';
import { PluginManager } from '../../Backend/GameLogic/PluginManager';
/**
 * Component for editing plugins. Saving causes its containing modal
 * to be closed, and the `overwrite` to be called, indicating that the
 * given plugin's source should be overwritten and reloaded. If no
 * plugin id is provided, assumes we're editing a new plugin.
 */
export declare function PluginEditorPane({ pluginHost, pluginId, setIsOpen, overwrite, }: {
    pluginHost?: PluginManager | null;
    pluginId?: PluginId;
    setIsOpen: (open: boolean) => void;
    overwrite: (newPluginName: string, newPluginCode: string, pluginId?: PluginId) => void;
}): JSX.Element;
