export default Sign;
declare class Sign {
    static Astronomical(language: any): Sign[];
    static Sidereal(language: any): Sign[];
    static Tropical(language: any): Sign[];
    static OfType(zodiac: any, language?: string): Sign[];
    constructor({ key, zodiac, language }?: {
        key?: string;
        zodiac?: string;
        language?: string;
    });
    key: string;
    zodiac: any;
    label: any;
    get StartDate(): any;
    get EndDate(): any;
    get ZodiacStart(): number;
    get ZodiacEnd(): number;
}
