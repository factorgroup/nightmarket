import { Monomitter } from '@darkforest_eth/events';
import { AutoGasSetting, EthAddress, Setting } from '@darkforest_eth/types';
import React from 'react';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
/**
 * Whenever a setting changes, we publish the setting's name to this event emitter.
 */
export declare const settingChanged$: Monomitter<Setting>;
export declare const ALL_AUTO_GAS_SETTINGS: AutoGasSetting[];
interface SettingStorageConfig {
    contractAddress: EthAddress;
    account: EthAddress | undefined;
}
/**
 * Each setting is stored in local storage. Each account has their own setting.
 */
export declare function getLocalStorageSettingKey({ contractAddress, account }: SettingStorageConfig, setting: Setting): string;
/**
 * Read the local storage setting from local storage.
 */
export declare function getSetting(config: SettingStorageConfig, setting: Setting): string;
/**
 * Save the given setting to local storage. Publish an event to {@link settingChanged$}.
 */
export declare function setSetting({ contractAddress, account }: SettingStorageConfig, setting: Setting, value: string): void;
/**
 * Loads from local storage, and interprets as a boolean the setting with the given name.
 */
export declare function getBooleanSetting(config: SettingStorageConfig, setting: Setting): boolean;
/**
 * Save the given setting to local storage. Publish an event to {@link settingChanged$}.
 */
export declare function setBooleanSetting(config: SettingStorageConfig, setting: Setting, value: boolean): void;
/**
 * Loads from local storage, and interprets as a boolean the setting with the given name.
 */
export declare function getNumberSetting(config: SettingStorageConfig, setting: Setting): number;
/**
 * Save the given setting to local storage. Publish an event to {@link settingChanged$}.
 */
export declare function setNumberSetting(config: SettingStorageConfig, setting: Setting, value: number): void;
/**
 * Allows a react component to subscribe to changes and set the given setting.
 */
export declare function useSetting(uiManager: GameUIManager, setting: Setting): [string, (newValue: string | undefined) => void];
export declare function StringSetting({ uiManager, setting, settingDescription, }: {
    uiManager: GameUIManager;
    setting: Setting;
    settingDescription?: string;
}): JSX.Element;
export declare function ColorSetting({ uiManager, setting, settingDescription, }: {
    uiManager: GameUIManager;
    setting: Setting;
    settingDescription?: string;
}): JSX.Element;
/**
 * Allows a react component to subscribe to changes and set the given setting as a number. Doesn't
 * allow you to set the value of this setting to anything but a valid number.
 */
export declare function useNumberSetting(uiManager: GameUIManager, setting: Setting): [number, (newValue: number) => void];
/**
 * Allows a react component to subscribe to changes to the given setting, interpreting its value as
 * a boolean.
 */
export declare function useBooleanSetting(uiManager: GameUIManager, setting: Setting): [boolean, (newValue: boolean) => void];
/**
 * React component that renders a checkbox representing the current value of this particular
 * setting, interpreting its value as a boolean. Allows the player to click on the checkbox to
 * toggle the setting. Toggling the setting both notifies the rest of the game that the given
 * setting was changed, and also saves it to local storage.
 */
export declare function BooleanSetting({ uiManager, setting, settingDescription, }: {
    uiManager: GameUIManager;
    setting: Setting;
    settingDescription?: string;
}): JSX.Element;
export declare function NumberSetting({ uiManager, setting, }: {
    uiManager: GameUIManager;
    setting: Setting;
}): JSX.Element;
/**
 * UI that is kept in-sync with a particular setting which allows you to set that setting to one of
 * several options.
 */
export declare function MultiSelectSetting({ uiManager, setting, values, labels, style, wide, }: {
    uiManager: GameUIManager;
    setting: Setting;
    values: string[];
    labels: string[];
    style?: React.CSSProperties;
    wide?: boolean;
}): JSX.Element;
/**
 * Some settings can be set from another browser window. In particular, the 'auto accept
 * transaction' setting is set from multiple browser windows. As a result, the local storage setting
 * can get out of sync with the in memory setting. To fix this, we can poll the given setting from
 * local storage, and notify the rest of the game that it changed if it changed.
 */
export declare function pollSetting(config: SettingStorageConfig, setting: Setting): ReturnType<typeof setInterval>;
export {};
