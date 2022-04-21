import { Artifact, Conversation } from '@darkforest_eth/types';
import React from 'react';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import GameUIManager from './GameUIManager';
export declare class PaidConversationManager {
    private gameUIManager;
    private terminal;
    private conversation;
    private setConversation;
    private setLoading;
    private artifact;
    constructor(gameUIManager: GameUIManager, terminal: React.MutableRefObject<TerminalHandle | undefined>, setConversation: (conversation: Conversation) => void, setLoading: (loading: boolean) => void, artifact: Artifact);
    getQuestionsRemaining(): number | undefined;
    start(): Promise<void>;
    private printClean;
    private printAllMessages;
    private printMessage;
}
