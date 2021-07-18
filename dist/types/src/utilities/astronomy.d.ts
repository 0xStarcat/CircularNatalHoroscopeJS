export function getObliquityEcliptic(): void;
export function getJulianDate({ year, month, date, ut, }?: {
    year?: number;
    month?: number;
    date?: number;
    ut?: number;
}): number;
export function getLocalSiderealTime({ jd, longitude }?: {
    jd?: number;
    longitude?: number;
}): number;
export function getMidheavenSun({ localSiderealTime, obliquityEcliptic }?: {
    localSiderealTime?: number;
    obliquityEcliptic?: number;
}): number;
export function getAscendant({ latitude, obliquityEcliptic, localSiderealTime }?: {
    latitude?: number;
    obliquityEcliptic?: number;
    localSiderealTime?: number;
}): number;
