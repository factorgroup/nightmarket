import { DeleteMessagesRequest, PlanetMessageRequest, PlanetMessageResponse, PostMessageRequest, SignedMessage } from '@darkforest_eth/types';
export declare function getMessagesOnPlanets(request: PlanetMessageRequest): Promise<PlanetMessageResponse>;
export declare function addMessage(request: SignedMessage<PostMessageRequest<unknown>>): Promise<void>;
export declare function deleteMessages(request: SignedMessage<DeleteMessagesRequest>): Promise<void>;
