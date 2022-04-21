/// <reference types="react" />
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
/**
 * This modal presents an overview of all of the player's plugins. Has a button to add a new plugin,
 * and lists out all the existing plugins, allowing the user to view their titles, as well as either
 * edit, delete, or open their modal.
 *
 * You can think of this as the plugin process list, the Activity Monitor of Dark forest.
 */
export declare function PluginLibraryPane({ gameUIManager, visible, onClose, modalsContainer, }: {
    gameUIManager: GameUIManager;
    visible: boolean;
    onClose: () => void;
    modalsContainer: Element;
}): JSX.Element;
