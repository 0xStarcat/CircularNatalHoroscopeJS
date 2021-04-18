export default ZodiacPosition;
declare class ZodiacPosition {
    constructor({ decimalDegrees, zodiac }?: {
        decimalDegrees?: number;
        zodiac?: string;
    });
    Sign: any;
}
