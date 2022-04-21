import React from 'react';
import { Btn, ShortcutBtn } from './Btn';
/**
 * A button that will show shortcuts if enabled globally in the game, otherwise it will display a normal button
 *
 * Must ONLY be used when a GameUIManager is available.
 */
export declare function MaybeShortcutButton(props: React.ComponentProps<typeof Btn> | React.ComponentProps<typeof ShortcutBtn>): JSX.Element;
