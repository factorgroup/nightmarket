export declare const enum Incompatibility {
    NoIDB = "no_idb",
    NotRopsten = "not_ropsten",
    MobileOrTablet = "mobile_or_tablet",
    UnsupportedBrowser = "unsupported_browser",
    NotLoggedInOrEnabled = "not_logged_in_or_enabled",
    UnexpectedError = "unexpected_error"
}
export declare const hasTouchscreen: () => boolean;
export declare const isMobileOrTablet: () => boolean;
export declare const unsupportedFeatures: () => Promise<Incompatibility[]>;
export declare const isFirefox: () => boolean;
export declare const isChrome: () => boolean;
export declare const isBrave: () => Promise<boolean>;
