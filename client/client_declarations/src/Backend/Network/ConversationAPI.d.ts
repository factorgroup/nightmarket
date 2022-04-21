import { ArtifactId, Conversation, ConversationArtifact, EthAddress } from '@darkforest_eth/types';
export declare function startConversationOpenAI(artifact: ConversationArtifact, artifactId: string, username: string): Promise<Conversation>;
export declare function stepConversationOpenAI(artifactId: string, message: string): Promise<Conversation>;
/**
 * IN-GAME ROUTES
 */
export declare function startConversation(timestamp: number, player: EthAddress, signature: string, artifactId: ArtifactId): Promise<Conversation>;
export declare function stepConversation(timestamp: number, player: EthAddress, signature: string, artifactId: ArtifactId, message: string): Promise<Conversation>;
export declare function getConversation(artifactId: ArtifactId): Promise<Conversation | undefined>;
