import { ArtifactRarity, ArtifactType, Conversation } from '@darkforest_eth/types';
import React from 'react';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
export declare class ConversationManager {
    private terminal;
    private conversation;
    private username;
    private artifact;
    private setConversation;
    private setLoading;
    private artifactId;
    constructor(terminal: React.MutableRefObject<TerminalHandle | undefined>, setConversation: (conversation: Conversation) => void, setLoading: (loading: boolean) => void, artifactType: ArtifactType, artifactRarity: ArtifactRarity);
    start(): Promise<void>;
    private printClean;
    private printLastMessage;
}
