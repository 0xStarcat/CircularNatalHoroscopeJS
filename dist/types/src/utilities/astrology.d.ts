export function getSignFromDD(decimalDegrees: any): any;
export function getHouseFromDD(houses: any, decimalDegrees: any): any;
export function constructHouses(cuspsArray: any, ascendantDegrees: any, zodiac: any, language?: string): any;
export function applyZodiacOffsetClockwise(tropicalZodiacLongitude: any, zodiac: any): number;
export function zodiacPositionToHorizon(ascendantZodiacDegrees: any, zodiacDegrees: any): number;
export function applyZodiacOffsetCounter(tropicalZodiacLongitude: any, zodiac: any): number;
export function getZodiacSign({ decimalDegrees, zodiac, language }?: {
    decimalDegrees?: number;
    zodiac?: string;
    language?: string;
}): any;
export function calculateKochHouseCusps({ rightAscensionMC, midheaven, ascendant, latitude, obliquityEcliptic, }?: {
    rightAscensionMC?: number;
    midheaven?: number;
    ascendant?: number;
    latitude?: number;
    obliquityEcliptic?: number;
}): string[];
export function calculatePlacidianHouseCusps({ rightAscensionMC, midheaven, ascendant, latitude, obliquityEcliptic, }?: {
    rightAscensionMC?: number;
    midheaven?: number;
    ascendant?: number;
    latitude?: number;
    obliquityEcliptic?: number;
}): any[];
export function calculateRegiomontanusHouseCusps({ rightAscensionMC, midheaven, ascendant, latitude, obliquityEcliptic, }?: {
    rightAscensionMC?: number;
    midheaven?: number;
    ascendant?: number;
    latitude?: number;
    obliquityEcliptic?: number;
}): any[];
export function calculateTopocentricHouseCusps({ rightAscensionMC, midheaven, ascendant, latitude, obliquityEcliptic, }?: {
    rightAscensionMC?: number;
    midheaven?: number;
    ascendant?: number;
    latitude?: number;
    obliquityEcliptic?: number;
}): any[];
export function calculateEqualHouseCusps({ ascendant, zodiac }?: {
    ascendant?: number;
    zodiac?: string;
}): number[];
export function calculateWholeSignHouseCusps({ ascendant, zodiac }?: {
    ascendant?: number;
    zodiac?: string;
}): number[];
export function calculateCampanusHouseCusps({ rightAscensionMC, midheaven, ascendant, latitude, obliquityEcliptic, }?: {
    rightAscensionMC?: number;
    midheaven?: number;
    ascendant?: number;
    latitude?: number;
    obliquityEcliptic?: number;
}): string[];
