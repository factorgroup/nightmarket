import React from 'react';
import { PluginManager } from '../../Backend/GameLogic/PluginManager';
import { PluginId, SerializedPlugin } from '../../Backend/Plugins/SerializedPlugin';
export declare const Actions: import("styled-components").StyledComponent<"div", any, {}, never>;
/**
 * Should
 * 1) open an editor for this plugin
 * 2) return a function that closes the editor.
 */
export declare type OpenEditor = (pluginId: PluginId) => () => void;
interface Props {
    /**
     * The plugin editor and all of the modals are rendered into this container
     * element
     */
    modalsContainer: Element;
    plugin: SerializedPlugin;
    pluginManager: PluginManager | undefined;
    openEditorForPlugin: OpenEditor;
    deletePlugin: (id: string) => void;
}
interface State {
    error?: string;
    modalOpen: boolean;
    rendered: boolean;
}
/**
 * One row in {@link PluginLibraryView}. Represents a single plugin. Allows
 * the user to edit, delete, or open the plugin. This class is responsible for
 * evaluating a plugin's source code (as safely as we can), and calling its
 * appropriate lifecycle methods. Loads and evaluates the plugin on mount,
 * and destroys and unloads the plugin on dismount. I'm not sure I like how tightly
 * coupled rendering is to evaluating here, so I'll probably move the evaluation
 * code into {@link PluginHost} at some point.
 */
export declare class OwnedPluginView extends React.Component<Props, State> {
    private closeEditor;
    private renderedPluginRef;
    state: {
        error: undefined;
        modalOpen: boolean;
        rendered: boolean;
    };
    private saveRef;
    private runClicked;
    private editClicked;
    private deletePluginClicked;
    private setModalIsOpen;
    render(): JSX.Element;
}
export {};
