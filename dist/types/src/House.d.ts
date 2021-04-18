export default class House {
    static convertIdToKey(id: any): string;
    constructor({ ascendantDegrees, eclipticDegreesStart, eclipticDegreesEnd, id, zodiac, language }?: {
        ascendantDegrees?: number;
        eclipticDegreesStart?: number;
        eclipticDegreesEnd?: number;
        id?: number;
        zodiac?: string;
        language?: string;
    });
    _language: string;
    id: number;
    label: any;
    ChartPosition: {
        StartPosition: ChartPosition;
        EndPosition: ChartPosition;
    };
    Sign: any;
}
import ChartPosition from "./ChartPosition";
