export function arccot(x: any): number;
export function degreesToRadians(degrees: any): number;
export function radiansToDegrees(radians: any): number;
export function sinFromDegrees(degrees: any): number;
export function cosFromDegrees(degrees: any): number;
export function tanFromDegrees(degrees: any): number;
export function modulo(number: any, mod: any): number;
export function hourTimeToDecimal({ hour, minute }?: {
    hour?: number;
    minute?: number;
}): any;
export function decimalTimeToHour({ decimal }?: {
    decimal?: number;
}): any;
export function decimalDegreesToDMS(decimalDegrees: any): {
    degrees: number;
    minutes: number;
    seconds: number;
};
export function isDegreeWithinCircleArc(arcLow: any, arcHigh: any, degree: any, edges?: string): any;
export function getModuloDifference(point1: any, point2: any): number;
