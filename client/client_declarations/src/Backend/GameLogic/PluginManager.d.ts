import { Monomitter } from '@darkforest_eth/events';
import { PluginId } from '@darkforest_eth/types';
import { PluginProcess } from '../Plugins/PluginProcess';
import { SerializedPlugin } from '../Plugins/SerializedPlugin';
import GameManager from './GameManager';
/**
 * Represents book-keeping information about a running process. We keep it
 * separate from the process code, so that the plugin doesn't accidentally
 * overwrite this information.
 */
export declare class ProcessInfo {
    rendered: boolean;
    hasError: boolean;
}
/**
 * This class keeps track of all the plugins that this player has loaded
 * into their game. Acts as a task manager, supports all CRUD operations
 * for plugins, as well as instantiating and destroying running plugins.
 * All library operations are also persisted to IndexDB.
 *
 * Important! Does not run plugins until the user clicks 'run' somewhere in
 * this UI. This is important, because if someone develops a buggy plugin,
 * it would suck if that bricked their game.
 */
export declare class PluginManager {
    private gameManager;
    /**
     * All the plugins in the player's library. Not all of the player's plugins
     * are running, and therefore not all exist in `pluginInstances`.
     * `PluginsManager` keeps this field in sync with the plugins the user has
     * saved in the IndexDB via {@link PersistentChunkStore}
     */
    private pluginLibrary;
    /**
     * Plugins that are currently loaded into the game, and are rendering into a modal.
     * `PluginsManager` makes sure that when a plugin starts executing, it is added into
     * `pluginInstances`, and that once a plugin is unloaded, its `.destroy()` method is called, and
     * that the plugin is removed from `pluginInstances`.
     */
    private pluginProcesses;
    /**
     * parallel to pluginProcesses
     */
    private pluginProcessInfos;
    /**
     * Event emitter that publishes whenever the set of plugins changes.
     */
    plugins$: Monomitter<SerializedPlugin[]>;
    constructor(gameManager: GameManager);
    /**
     * If a plugin with the given id is running, call its `.destroy()` method,
     * and remove it from `pluginInstances`. Stop listening for new local plugins.
     */
    destroy(id: PluginId): void;
    /**
     * Load all plugins from this disk into `pluginLibrary`. Insert the default
     * plugins into the player's library if the default plugins have never been
     * added before. Effectively idempotent after the first time you call it.
     */
    load(isAdmin: boolean): Promise<void>;
    /**
     * Remove the given plugin both from the player's library, and kills
     * the plugin if it is running.
     */
    deletePlugin(pluginId: PluginId): Promise<void>;
    /**
     * Gets the serialized plugin with the given id from the player's plugin
     * library. `undefined` if no plugin exists.
     */
    getPluginFromLibrary(id?: PluginId): SerializedPlugin | undefined;
    /**
     * 1) kills the plugin if it's running
     * 2) edits the plugin-library version of this plugin
     * 3) if a plugin was edited, save the plugin library to disk
     */
    overwritePlugin(newName: string, pluginCode: string, id: PluginId): void;
    /**
     * Reorders the current plugins. plugin ids in `newPluginIdOrder` must correspond
     * 1:1 to plugins in the plugin library.
     */
    reorderPlugins(newPluginIdOrder: string[]): void;
    /**
     * adds a new plugin into the plugin library.
     */
    addPluginToLibrary(id: PluginId, name: string, code: string): SerializedPlugin;
    /**
     * Either spawns the given plugin by evaluating its `pluginCode`, or
     * returns the already running plugin instance. If starting a plugin
     * throws an error then returns `undefined`.
     */
    spawn(id: PluginId): Promise<PluginProcess | undefined>;
    /**
     * If this plugin's `render` method has not been called yet, then
     * call it! Remembers that this plugin has been rendered.
     */
    render(id: PluginId, element: HTMLDivElement): Promise<void>;
    /**
     * Gets all the plugins in this player's library.
     */
    getLibrary(): SerializedPlugin[];
    /**
     * If this process has been started, gets its info
     */
    getProcessInfo(id: PluginId): ProcessInfo;
    /**
     * Gets a map of all the currently running processes
     */
    getAllProcessInfos(): Map<PluginId, ProcessInfo>;
    /**
     * For each currently running plugin, if the plugin has a 'draw'
     * function, then draw that plugin to the screen.
     */
    drawAllRunningPlugins(ctx: CanvasRenderingContext2D): void;
    private hasPlugin;
    private onNewEmbeddedPlugins;
    private notifyPluginLibraryUpdated;
    /**
     * To prevent users of this class from modifying our plugins library,
     * we return clones of the plugins. This should probably be a function
     * in a Utils file somewhere, but I thought I should leave a good comment
     * about why we return copies of the plugins from the library.
     */
    private static copy;
}
