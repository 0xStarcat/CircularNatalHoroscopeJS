'use strict';

import moment from 'moment'
import { degreesToRadians, radiansToDegrees, modulo, arccot, sinFromDegrees, cosFromDegrees, tanFromDegrees } from './math'
const eph = require('../../lib/ephemeris-0.1.0');


export const getObliquityEcliptic = () => {
  return
}

export const getJulianDate = ({year=0, month=0, date=0, ut=0}={}) => {
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

  return  (367 * year) -
          Math.floor(7 * (year + Math.floor((month + 9) / 12)) / 4) -
          Math.floor(3 * (Math.floor((year + (month - 9) / 7) / 100) + 1) / 4) +
          Math.floor((275 * month) / 9) +
          date +
          1721028.5 +
          (ut / 24)
}

export const getLocalSiderealTime = ({jd = 0, longitude = 0}={}) => {
  // Also gives: Right Ascension of M.C. or RAMC
  /////////
  // * float jd = julian date decimal
  // * float longitude = local longitude in decimal form
  // => returns Float || the sidereal time in arc degrees (0...359)
  /////////
  // Source: Astronomical Algorithims by Jean Meeus (1991) - Ch 11, pg 84 formula 11.4
  // verified with http://neoprogrammics.com/sidereal_time_calculator/index.php

  const julianDaysJan1st2000 = 2451545.0
  const julianDaysSince2000 = jd - julianDaysJan1st2000
  const tFactor = (julianDaysSince2000) / 36525 // centuries
  const degreesRotationInSiderealDay = 360.98564736629
  const lst = 280.46061837 +
              (degreesRotationInSiderealDay * (julianDaysSince2000)) +
              0.000387933 * Math.pow(tFactor, 2) -
              (Math.pow(tFactor, 3) / 38710000) +
              longitude

  const modLst = modulo(parseFloat(lst), 360)
  return modLst

}

export const getMidheavenSun = ({localSiderealTime=0.00, obliquityEcliptic=23.4367, zodiacOffset= 0.00}={}) => {
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


  const tanLST = tanFromDegrees(localSiderealTime)
  const cosOE = cosFromDegrees(obliquityEcliptic)
  const midheaven = modulo(radiansToDegrees(Math.atan(tanLST / cosOE)), 360)

  return midheaven - zodiacOffset
}

export const getAscendant = ({latitude=0.00, obliquityEcliptic=23.4367, localSiderealTime=0.00, zodiacOffset=0.00} = {}) => {
  //////////
  // * float latitude
  // * float obliquityEcliptic
  // * float localSiderealTime
  // returns => Float as degrees
  //////////
  // source: An Astrological House Formulary by Michael P. Munkasey
  // verified with https://cafeastrology.com/ascendantcalculator.html and https://www.astrosofa.com/horoscope/ascendant
  // Default obliquityEcliptic value from http://www.neoprogrammics.com/obliquity_of_the_ecliptic/
  // for Mean Obliquity on Sept. 22 2019 at 0000 UTC

  const a = tanFromDegrees(latitude) * sinFromDegrees(obliquityEcliptic)
  const b = sinFromDegrees(localSiderealTime) * cosFromDegrees(obliquityEcliptic)
  const c = (a + b) / cosFromDegrees(localSiderealTime)

  const ascendant = modulo(radiansToDegrees(arccot(-c)), 360)
  return ascendant - zodiacOffset
}

export const getAllPlanets = ({year=0, month=0, date=0, hour=0, minute=0, second=0, geodeticalLongitude=0.00, geodeticalLatitude=0.00, height=0}={}) => {
  // modified from source: https://github.com/xErik/ephemeris-moshier/blob/master/index.js

    eph.const.tlong = parseFloat(geodeticalLongitude);
    eph.const.glat = parseFloat(geodeticalLatitude);
    eph.const.height = parseFloat(height);

    const parsedDate = {
        day: date,
        month: month + 1, // Moment months are from 0 - 11 while this library uses 1 - 12
        year: year,
        hours: hour,
        minutes: minute,
        seconds: second
    };

    eph.const.date = parsedDate;

    eph.processor.init();

    var ret = {
        date: undefined,
        observer: undefined,
        observed: {}
    };

    var observables = Object.keys(eph.moshier.body);

    for (var i = 0; i < observables.length; i++) {

        var observeMe = observables[i];
        if (['earth', 'init'].indexOf(observeMe) >= 0) {
            continue;
        }

        eph.const.body = eph.moshier.body[observeMe];

        eph.processor.calc(parsedDate, eph.const.body);

        if (ret.date === undefined) {
            ret.date = {
                gregorianTerrestrial: [parsedDate.day, parsedDate.month, parsedDate.year].join('.') + ' ' + [parsedDate.hours, parsedDate.minutes, parsedDate.seconds].join(':'),
                gregorianTerrestrialRaw: date,
                gregorianUniversal: (eph.const.date.universalDateString),
                gregorianDelta: ("00:00:" + (eph.const.date.delta)),
                julianTerrestrial: (eph.const.date.julian),
                julianUniversal: (eph.const.date.universal),
                julianDelta: (eph.const.date.delta / 86400)
            };
        }

        if (ret.observer === undefined) {
            ret.observer = {
                name: "earth",
                longitueGeodetic: (eph.const.tlong),
                longitudeGeodecentric: (eph.const.tlong),
                latitudeGeodetic: (eph.const.glat),
                latitudeGeodecentric: (eph.const.tlat),
                heightGeodetic: (eph.const.height),
                heightGeodecentric: (eph.const.trho * eph.const.aearth / 1000),
            };
        }

        var body = {
            name: eph.const.body.key,
            raw: eph.const.body,
            apparentLongitudeDms30: (eph.const.body.position.apparentLongitude30String),
            apparentLongitudeDms360: (eph.const.body.position.apparentLongitudeString),
            apparentLongitudeDd: (eph.const.body.position.apparentLongitude),
            geocentricDistanceKm: (eph.const.body.position.geocentricDistance)
        };
        ret.observed[body.name] = body;

    }

    return ret;
}
