import { LocationId } from '@darkforest_eth/types';
export declare type Hat = {
    topLayer: Array<string>;
    bottomLayer: Array<string>;
};
export declare const enum HatType {
    GraduationCap = "GraduationCap",
    PartyHat = "PartyHat",
    Fish = "Fish",
    TopHat = "TopHat",
    Fez = "Fez",
    ChefHat = "ChefHat",
    CowboyHat = "CowboyHat",
    PopeHat = "PopeHat",
    Squid = "Squid",
    SantaHat = "SantaHat"
}
export declare const hats: Record<HatType, Hat>;
export declare const hatFromType: (type: HatType) => Hat;
export declare const hatTypeFromHash: (hash: LocationId) => HatType;
