// 'use strict';

import moment from 'moment';
import {
  degreesToRadians, radiansToDegrees, modulo, arccot, sinFromDegrees, cosFromDegrees, tanFromDegrees, decimalDegreesToDMS,
} from './math';

export const getObliquityEcliptic = () => {

};

export const getJulianDate = ({
  year = 0, month = 0, date = 0, ut = 0,
} = {}) =>
  // Works with calendar dates > 1 C.E.
  //////////
  // * int year (1...)
  // * int month (1...12)
  // * int date = (1...31)
  // * float ut = universal time
  // => Returns Float || the Julian Date given the specific Gregorian calendar date
  //////////
  // From http://scienceworld.wolfram.com/astronomy/JulianDate.html
  // Source: "Fundamentals of Celestial Mechanics 2nd Edition" by Danby (1988)
  // verified with https://aa.usno.navy.mil/data/docs/JulianDate.php

  (367 * year)
  - Math.floor(7 * (year + Math.floor((month + 9) / 12)) / 4)
  - Math.floor(3 * (Math.floor((year + (month - 9) / 7) / 100) + 1) / 4)
  + Math.floor((275 * month) / 9)
  + date
  + 1721028.5
  + (ut / 24);
export const getLocalSiderealTime = ({ jd = 0, longitude = 0 } = {}) => {
  // Also gives: Right Ascension of M.C. or RAMC
  /////////
  // * float jd = julian date decimal
  // * float longitude = local longitude in decimal form
  // => returns Float || the sidereal time in arc degrees (0...359)
  /////////
  // Source: Astronomical Algorithims by Jean Meeus (1991) - Ch 11, pg 84 formula 11.4
  // verified with http://neoprogrammics.com/sidereal_time_calculator/index.php

  const julianDaysJan1st2000 = 2451545.0;
  const julianDaysSince2000 = jd - julianDaysJan1st2000;
  const tFactor = (julianDaysSince2000) / 36525; // centuries
  const degreesRotationInSiderealDay = 360.98564736629;
  const lst = 280.46061837
    + (degreesRotationInSiderealDay * (julianDaysSince2000))
    + 0.000387933 * Math.pow(tFactor, 2)
    - (Math.pow(tFactor, 3) / 38710000)
    + longitude;

  const modLst = modulo(parseFloat(lst), 360);
  return modLst;
};

export const getMidheavenSun = ({ localSiderealTime = 0.00, obliquityEcliptic = 23.4367 } = {}) => {
  // Also known as: Medium Coeli or M.C.
  //////////
  // * float localSiderealTime = local sidereal time in degrees
  // * float obliquityEcliptic = obliquity of ecpliptic in degrees
  // => returns Float as degrees
  /////////
  // Source: Astronomical Algorithims by Jean Meeus (1991) Ch 24 pg 153 - formula 24.6
  // verified with https://astrolibrary.org/midheaven-calculator/ and https://cafeastrology.com/midheaven.html
  // Default obliquityEcliptic value from http://www.neoprogrammics.com/obliquity_of_the_ecliptic/
  // for Mean Obliquity on Sept. 22 2019 at 0000 UTC

  const tanLST = tanFromDegrees(localSiderealTime);
  const cosOE = cosFromDegrees(obliquityEcliptic);
  let midheaven = radiansToDegrees(Math.atan(tanLST / cosOE));

  // Correcting the quadrant
  if (midheaven < 0) {
    midheaven += 360;
  }

  if (midheaven > localSiderealTime) {
    midheaven -= 180;
  }

  if (midheaven < 0) {
    midheaven += 180;
  }

  if (midheaven < 180 && localSiderealTime >= 180) {
    midheaven += 180;
  }

  return modulo(midheaven, 360);
};

export const getAscendant = ({ latitude = 0.00, obliquityEcliptic = 23.4367, localSiderealTime = 0.00 } = {}) => {
  latitude = parseFloat(latitude);
  obliquityEcliptic = parseFloat(obliquityEcliptic);
  localSiderealTime = parseFloat(localSiderealTime); // this should be in degrees, aka right ascension of MC

  const a = -cosFromDegrees(localSiderealTime);
  const b = sinFromDegrees(obliquityEcliptic) * tanFromDegrees(latitude);
  const c = cosFromDegrees(obliquityEcliptic) * sinFromDegrees(localSiderealTime);
  const d = b + c;
  const e = a / d;
  const f = Math.atan(e);

  // console.log(latitude, localSiderealTime, a, b, c, d, e, f)
  let ascendant = radiansToDegrees(f);

  // modulation from wikipedia
  // https://en.wikipedia.org/wiki/Ascendant
  // citation Peter Duffett-Smith, Jonathan Zwart, Practical astronomy with your calculator or spreadsheet-4th ed., p47, 2011

  if (d < 0) {
    ascendant += 180;
  } else {
    ascendant += 360;
  }

  if (ascendant >= 180) {
    ascendant -= 180;
  } else {
    ascendant += 180;
  }

  return modulo(ascendant, 360);
};

//
// * Legacy method - has issues *
// export const getAscendant = ({latitude=0.00, obliquityEcliptic=23.4367, localSiderealTime=0.00 } = {}) => {
//   latitude = parseFloat(latitude)
//   obliquityEcliptic = parseFloat(obliquityEcliptic)
//   localSiderealTime = parseFloat(localSiderealTime)
//
//   // TODO - reimplement with meeus calc Astronomical Algorithms, p99
//   // test lat 42.37 and lst 90.808 should turn into libra 180.06... not Aries 0.06
//
//   //////////
//   // * float latitude
//   // * float obliquityEcliptic
//   // * float localSiderealTime
//   // returns => Float as degrees
//   //////////
//   // ARCCOT (- ( (TAN f x SIN e) + (SIN RAMC x COS e) ) ÷ COS RAMC)
//   // source: An Astrological House Formulary by Michael P. Munkasey
//   // verified with https://cafeastrology.com/ascendantcalculator.html and https://www.astrosofa.com/horoscope/ascendant
//   // Default obliquityEcliptic value from http://www.neoprogrammics.com/obliquity_of_the_ecliptic/
//   // for Mean Obliquity on Sept. 22 2019 at 0000 UTC
//
//   const a = tanFromDegrees(parseFloat(latitude)) * sinFromDegrees(obliquityEcliptic)
//   const b = sinFromDegrees(localSiderealTime) * cosFromDegrees(obliquityEcliptic)
//   const c = (a + b) / cosFromDegrees(localSiderealTime)
//
//   let ascendant = radiansToDegrees(arccot(-c))
//
//   if (ascendant < 0) {
//     ascendant += 180
//   } else {
//     ascendant += 360
//   }
//
//   if (ascendant < 180) {
//     ascendant += 180
//   } else {
//     ascendant -= 180
//   }
//
//   return modulo(ascendant, 360)
// }
