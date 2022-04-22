/// <reference types="react" />
import { Hook } from '../../_types/global/GlobalTypes';
export declare function SidebarPane({ settingsHook, helpHook, pluginsHook, yourArtifactsHook, planetdexHook, transactionLogHook, }: {
    settingsHook: Hook<boolean>;
    helpHook: Hook<boolean>;
    pluginsHook: Hook<boolean>;
    yourArtifactsHook: Hook<boolean>;
    planetdexHook: Hook<boolean>;
    transactionLogHook: Hook<boolean>;
}): JSX.Element;
