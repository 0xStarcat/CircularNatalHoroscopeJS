export class Horoscope {
    static HouseSystems(language?: string): {
        value: string;
        label: any;
    }[];
    static HouseLabels(language?: string): {
        key: number;
        label: any;
    }[];
    static ZodiacSystems(language?: string): {
        value: string;
        label: any;
    }[];
    static ZodiacLabels(language?: string): {
        key: string;
        label: any;
    }[];
    static CelestialLabels(language?: string): any[];
    static Languages(): {
        key: string;
        value: string;
        label: any;
    }[];
    static AspectLabels(language?: string): {
        key: string;
        label: any;
        defaultOrb: any;
        angle: any;
        level: any;
        levelLabel: any;
    }[];
    constructor({ origin, language, houseSystem, zodiac, aspectPoints, aspectWithPoints, aspectTypes, customOrbs, }?: {
        origin?: any;
        language?: string;
        houseSystem?: string;
        zodiac?: string;
        aspectPoints?: string[];
        aspectWithPoints?: string[];
        aspectTypes?: string[];
        customOrbs?: {};
    });
    origin: any;
    _language: string;
    _houseSystem: any;
    _zodiac: any;
    _ascendant: {
        key: string;
        label: any;
        Sign: any;
        ChartPosition: ChartPosition;
    };
    _midheaven: {
        key: string;
        label: any;
        Sign: any;
        ChartPosition: ChartPosition;
    };
    _sunSign: Sign;
    _houses: any;
    _zodiacCusps: {
        ChartPosition: ChartPosition;
        Sign: any;
    }[];
    _aspectTypes: any;
    _aspectPoints: any;
    _aspectWithPoints: any;
    _customOrbs: any;
    Ephemeris: any;
    _celestialBodies: any;
    _celestialPoints: any;
    _aspects: {
        all: any[];
        types: {};
        points: {};
    };
    createAscendant(): {
        key: string;
        label: any;
        Sign: any;
        ChartPosition: ChartPosition;
    };
    createMidheaven(): {
        key: string;
        label: any;
        Sign: any;
        ChartPosition: ChartPosition;
    };
    createSunSign(zodiac: any, language: any): Sign;
    createZodiacCusps(): {
        ChartPosition: ChartPosition;
        Sign: any;
    }[];
    createHouses(string: any): any;
    processCelestialBodies(ephemerisResults: any): any;
    processCelestialPoints(ephemerisResults: any): any;
    get Ascendant(): {
        key: string;
        label: any;
        Sign: any;
        ChartPosition: ChartPosition;
    };
    get Midheaven(): {
        key: string;
        label: any;
        Sign: any;
        ChartPosition: ChartPosition;
    };
    get SunSign(): Sign;
    get Houses(): any;
    get ZodiacCusps(): {
        ChartPosition: ChartPosition;
        Sign: any;
    }[];
    get Angles(): any;
    get CelestialBodies(): any;
    get CelestialPoints(): any;
    get Aspects(): {
        all: any[];
        types: {};
        points: {};
    };
}
export default Horoscope;
import ChartPosition from "./ChartPosition";
import Sign from "./Sign";
