export declare const enum EventType {
    Transaction = "transaction",
    Diagnostics = "diagnostics"
}
export declare class EventLogger {
    static augmentEvent(event: unknown, eventType: EventType): {
        df_event_type: EventType;
    };
    logEvent(eventType: EventType, event: unknown): void;
}
export declare const eventLogger: EventLogger;
