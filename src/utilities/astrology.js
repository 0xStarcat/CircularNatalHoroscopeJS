import Sign from '../Sign';
import House from '../House';

import {
  modulo, arccot, degreesToRadians, radiansToDegrees, tanFromDegrees, cosFromDegrees, sinFromDegrees, isDegreeWithinCircleArc,
} from './math';

// https://horoscopes.lovetoknow.com/about-astrology/new-horoscope-dates

export const getSignFromDD = (decimalDegrees) =>
  // Converts a decimal degree (0 - 359) into its astrological sign
  //////////
  // * float decimalDegrees
  // => returns { <signObject> }
  //////////

  Sign.Data.find((sign) => sign.zodiacStart <= decimalDegrees && sign.zodiacEnd > decimalDegrees);
export const getHouseFromDD = (houses, decimalDegrees) => {
  decimalDegrees = modulo(decimalDegrees, 360);
  return houses.find((house) => isDegreeWithinCircleArc(house.ChartPosition.StartPosition.Ecliptic.DecimalDegrees, house.ChartPosition.EndPosition.Ecliptic.DecimalDegrees, decimalDegrees));
};

export const constructHouses = (cuspsArray, ascendantDegrees, zodiac, language = 'en') => cuspsArray.map((cuspDegree, index) => {
  const houseId = index + 1;
  return new House({
    ascendantDegrees, eclipticDegreesStart: cuspDegree, eclipticDegreesEnd: cuspsArray[modulo(index + 1, cuspsArray.length + 1)], id: houseId, zodiac, language,
  });
});

export const applyZodiacOffsetClockwise = (tropicalZodiacLongitude, zodiac) => {
  // conversion from https://vijayajyoti.com/sidereal-and-tropical-zodiac/
  tropicalZodiacLongitude = parseFloat(tropicalZodiacLongitude);
  switch (zodiac) {
    case 'astronomical':
      return modulo(parseFloat(tropicalZodiacLongitude) + 24.1, 360);
    case 'sidereal':
      return modulo(parseFloat(tropicalZodiacLongitude) + 24.1, 360);
    case 'tropical':
      return modulo(parseFloat(tropicalZodiacLongitude), 360);
  }
};

export const zodiacPositionToHorizon = (ascendantZodiacDegrees, zodiacDegrees) => parseFloat(modulo(ascendantZodiacDegrees - zodiacDegrees, 360));

export const applyZodiacOffsetCounter = (tropicalZodiacLongitude, zodiac) => {
  // conversion from https://vijayajyoti.com/sidereal-and-tropical-zodiac/
  tropicalZodiacLongitude = parseFloat(tropicalZodiacLongitude);
  switch (zodiac) {
    case 'astronomical':
      return modulo(parseFloat(tropicalZodiacLongitude) - 24.1, 360);
    case 'sidereal':
      return modulo(parseFloat(tropicalZodiacLongitude) - 24.1, 360);
    case 'tropical':
      return modulo(parseFloat(tropicalZodiacLongitude), 360);
  }
};

const getZodiacSignFromRange = (signs, decimalDegrees, zodiac) => {
  const zodiacSign = signs.find((sign) => {
    const start = sign.ZodiacStart;
    const end = sign.ZodiacEnd;
    return isDegreeWithinCircleArc(parseFloat(start), parseFloat(end), parseFloat(decimalDegrees));
  });

  return zodiacSign;
};

export const getZodiacSign = ({ decimalDegrees = 0.00, zodiac = 'tropical', language = 'en' } = {}) => {
  // Converts a decimal degree (0 - 359) of the zodiac sphere
  // and its corresponding zodiac type into an astrological sign
  //////////
  // * float decimalDegree
  // * string zodiac = ['astronimical', 'sidereal', 'tropical']
  // => returns { <signObject> }
  //////////
  switch (zodiac) {
    case 'astronomical':
      return getZodiacSignFromRange(Sign.Astronomical(language), decimalDegrees, zodiac);
    case 'sidereal':
      return getZodiacSignFromRange(Sign.Sidereal(language), decimalDegrees, zodiac);
    case 'tropical':
      return getZodiacSignFromRange(Sign.Tropical(language), decimalDegrees, zodiac);
  }
};

const shouldMod180 = (prevCusp, currentCusp) => {
  // ** NOTE ** the calculated houses may require a 180 degree correction
  // used in Monk house systems (Placidus, Regiomontanus, etc)
  // all values are mod360ed
  if (currentCusp < prevCusp) {
    // For instances when prev = 350 and current = 20
    // But not when prev = 250 and current = 100 (280)
    if (Math.abs(currentCusp - prevCusp) >= 180) return false;
    return true;
  } if (prevCusp < currentCusp) {
    if (currentCusp - prevCusp < 180) return false;
    return true;
  }
};

const calculateCusps1 = (ascendant, midheaven, calculatedCuspFunction) => {
  // function which performs the same "calculatedCuspFunction" for each house

  const c1 = ascendant;
  const c2 = modulo(calculatedCuspFunction(2), 360);
  const c3 = modulo(calculatedCuspFunction(3), 360);
  const c4 = modulo(midheaven + 180, 360);
  const c10 = midheaven;
  const c11 = calculatedCuspFunction(11);
  const c12 = calculatedCuspFunction(12);
  const c5 = modulo(c11 + 180, 360);
  const c6 = modulo(c12 + 180, 360);
  const c7 = modulo(ascendant + 180, 360);
  const c8 = modulo(c2 + 180, 360);
  const c9 = modulo(c3 + 180, 360);

  // ** For debugging **
  // const rawArr = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12]
  // console.log(rawArr)

  const firstCusp = c1;
  const secondCusp = shouldMod180(c1, c2) ? modulo(c2 + 180, 360) : c2;
  const thirdCusp = shouldMod180(c1, c3) ? modulo(c3 + 180, 360) : c3;
  const fourthCusp = c4;
  const fifthCusp = shouldMod180(c4, c5) ? modulo(c5 + 180, 360) : c5;
  const sixthCusp = shouldMod180(c4, c6) ? modulo(c6 + 180, 360) : c6;
  const seventhCusp = c7;
  const eighthCusp = shouldMod180(c7, c8) ? modulo(c8 + 180, 360) : c8;
  const ninthCusp = shouldMod180(c7, c9) ? modulo(c9 + 180, 360) : c9;
  const tenthCusp = c10;
  const eleventhCusp = shouldMod180(c10, c11) ? modulo(c11 + 180, 360) : c11;
  const twelthCusp = shouldMod180(c10, c12) ? modulo(c12 + 180, 360) : c12;

  const arr = [
    firstCusp.toFixed(4), secondCusp.toFixed(4), thirdCusp.toFixed(4), fourthCusp.toFixed(4), fifthCusp.toFixed(4), sixthCusp.toFixed(4),
    seventhCusp.toFixed(4), eighthCusp.toFixed(4), ninthCusp.toFixed(4), tenthCusp.toFixed(4), eleventhCusp.toFixed(4), twelthCusp.toFixed(4),
  ];

  return arr;
};

export const calculateKochHouseCusps = ({
  rightAscensionMC = 0.00, midheaven = 0.00, ascendant = 0.00, latitude = 0.00, obliquityEcliptic = 23.4367,
} = {}) => {
  // The house system is named after the German astrologer Walter Koch (1895-1970) but was actually // invented by Fiedrich Zanzinger (1913-1967) and Heinz Specht (1925-).
  // NOTE - known to perform irregularly at latitudes greater than +60 and less than -60
  // source: An Astrological House Formulary by Michael P. Munkasey, page 14
  // verified with https://astrolibrary.org/compare-house-systems/
  //////////
  // * float rightAscensionMC = localSiderealTime converted to degrees
  // * float midheaven = midheaven (aka M.C.) in degrees
  // * float ascendant = ascendant in degrees
  // * float latitude = latitude of origin in degrees
  // * float obliquityEcliptic = obliquity of ecliptic in degrees
  // returns => [1..12] (array of 12 floats marking the cusp of each house)
  //////////

  const declinationMC = Math.asin(sinFromDegrees(midheaven) * sinFromDegrees(obliquityEcliptic)); // radians
  const ascensionalDiff = Math.asin(Math.tan(declinationMC) * tanFromDegrees(latitude)); // radians
  const obliqueAscensionMC = degreesToRadians(rightAscensionMC) - ascensionalDiff; // radians
  const cuspDisplacementInterval = modulo(((rightAscensionMC + 90) - radiansToDegrees(obliqueAscensionMC)) / 3, 360); // degrees

  const houseCuspPosition = (houseNumber) => {
    // returns => n in degrees
    switch (houseNumber) {
      case 11:
        return radiansToDegrees(obliqueAscensionMC) + cuspDisplacementInterval - 90;
      case 12:
        return houseCuspPosition(11) + cuspDisplacementInterval;
      case 1:
        return houseCuspPosition(12) + cuspDisplacementInterval;
      case 2:
        return houseCuspPosition(1) + cuspDisplacementInterval;
      case 3:
        return houseCuspPosition(2) + cuspDisplacementInterval;
    }
  };

  const calculatedCusp = (houseNumber) => {
    const radians = arccot(-((tanFromDegrees(latitude) * sinFromDegrees(obliquityEcliptic)) + (sinFromDegrees(houseCuspPosition(houseNumber)) * cosFromDegrees(obliquityEcliptic))) / cosFromDegrees(houseCuspPosition(houseNumber)));

    return radiansToDegrees(radians);
  };

  const c1 = modulo(calculatedCusp(1), 360);
  const c2 = modulo(calculatedCusp(2), 360);
  const c3 = modulo(calculatedCusp(3), 360);
  const c4 = modulo(midheaven + 180, 360);
  const c10 = midheaven;
  const c11 = calculatedCusp(11);
  const c12 = calculatedCusp(12);
  const c5 = modulo(c11 + 180, 360);
  const c6 = modulo(c12 + 180, 360);
  const c7 = modulo(ascendant + 180, 360);
  const c8 = modulo(c2 + 180, 360);
  const c9 = modulo(c3 + 180, 360);

  // ** For debugging **
  // const rawArr = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12]
  // console.log(rawArr)

  const firstCusp = c1;
  const secondCusp = shouldMod180(c1, c2) ? modulo(c2 + 180, 360) : c2;
  const thirdCusp = shouldMod180(c1, c3) ? modulo(c3 + 180, 360) : c3;
  const fourthCusp = c4;
  const fifthCusp = shouldMod180(c4, c5) ? modulo(c5 + 180, 360) : c5;
  const sixthCusp = shouldMod180(c4, c6) ? modulo(c6 + 180, 360) : c6;
  const seventhCusp = c7;
  const eighthCusp = shouldMod180(c7, c8) ? modulo(c8 + 180, 360) : c8;
  const ninthCusp = shouldMod180(c7, c9) ? modulo(c9 + 180, 360) : c9;
  const tenthCusp = c10;
  const eleventhCusp = shouldMod180(c10, c11) ? modulo(c11 + 180, 360) : c11;
  const twelthCusp = shouldMod180(c10, c12) ? modulo(c12 + 180, 360) : c12;

  const arr = [
    firstCusp.toFixed(4), secondCusp.toFixed(4), thirdCusp.toFixed(4), fourthCusp.toFixed(4), fifthCusp.toFixed(4), sixthCusp.toFixed(4),
    seventhCusp.toFixed(4), eighthCusp.toFixed(4), ninthCusp.toFixed(4), tenthCusp.toFixed(4), eleventhCusp.toFixed(4), twelthCusp.toFixed(4),
  ];

  return arr;
};

export const calculatePlacidianHouseCusps = ({
  rightAscensionMC = 0.00, midheaven = 0.00, ascendant = 0.00, latitude = 0.00, obliquityEcliptic = 23.4367,
} = {}) => {
  // Most widely used house system. The Placidus house system is named after the Italian monk and mathematician Placidus de Titis (1603-1668), but was first published in Europe by the astronomer and mathematician Giovanni Antonio Magini (1555-1617). Evidence suggests it was published even earlier in 13th century Arabic literature.
  // NOTE - known to perform irregularly at latitudes greater than +60 and less than -60
  // source: An Astrological House Formulary by Michael P. Munkasey, page 18
  // verified with https://astrolibrary.org/compare-house-systems/
  //////////
  // * float rightAscensionMC = localSiderealTime converted to degrees
  // * float midheaven = midheaven (aka M.C.) in degrees
  // * float ascendant = ascendant in degrees
  // * float latitude = latitude of origin in degrees
  // * float obliquityEcliptic = obliquity of ecliptic in degrees
  //////////

  const cuspInterval = (houseNumber) => {
    // returns n in degrees
    switch (houseNumber) {
      case 2:
        return rightAscensionMC + 120;
        break;
      case 3:
        return rightAscensionMC + 150;
        break;
      case 11:
        return rightAscensionMC + 30;
        break;
      case 12:
        return rightAscensionMC + 60;
        break;
    }
  };

  const semiArcRatio = (houseNumber) => {
    switch (houseNumber) {
      case 2:
        return 2 / 3;
      case 3:
        return 1 / 3;
      case 11:
        return 1 / 3;
      case 12:
        return 2 / 3;
    }
  };

  const initialCuspalDeclination = (interval, semiArcRatio) =>
    // returns => n in radians
    Math.asin(sinFromDegrees(obliquityEcliptic) * sinFromDegrees(interval));
  const calculatedCusp = (houseNumber) => {
    const interval = cuspInterval(houseNumber);
    const saRatio = semiArcRatio(houseNumber);
    let cuspValue = initialCuspalDeclination(interval, semiArcRatio);
    let prevCuspValue = 0;

    // Iterates until difference is tiny
    while (Math.abs(cuspValue - prevCuspValue) > 0.01) {
      const tanCusp = Math.tan(cuspValue);
      // const a = saRatio * Math.asin(tanFromDegrees(latitude) * tanCusp) // radians
      // const m = Math.atan(Math.sin(a) / (cosFromDegrees(obliquityEcliptic) * tanCusp)) // radians
      // ** NOTE **
      // An error with Munkasey's formula results in a trignomic impossibility
      // where const "a" takes the arcsin of a number greater than 1.
      // The following "m" step was found on a forum as a trigonomic simplification of Munkasey's steps 5 + 6 which removes the need for arcsin
      const m = Math.atan(saRatio * (tanFromDegrees(latitude) / cosFromDegrees(interval))); // https://www.astrologyweekly.com/forum/showthread.php?t=50451
      const r = Math.atan((tanFromDegrees(interval) * Math.cos(m)) / Math.cos(m + degreesToRadians(obliquityEcliptic)));
      prevCuspValue = cuspValue;
      cuspValue = r;
    }

    return radiansToDegrees(cuspValue) + 180;
  };

  return calculateCusps1(ascendant, midheaven, calculatedCusp);
};

export const calculateRegiomontanusHouseCusps = ({
  rightAscensionMC = 0.00, midheaven = 0.00, ascendant = 0.00, latitude = 0.00, obliquityEcliptic = 23.4367,
} = {}) => {
  // The house system is named after the German mathematician, astronomer and astrologer
  // Regiomontanus (Johannes Müller of Königsberg, 1436-1476), but was invented by the Spanish
  // Jewish astrologer Abrahma ibn Esra (-1167).
  // NOTE - known to perform irregularly at latitudes greater than +60 and less than -60
  // source: An Astrological House Formulary by Michael P. Munkasey, page 20
  // verified with https://astrolibrary.org/compare-house-systems/
  //////////
  // * float rightAscensionMC = localSiderealTime converted to degrees
  // * float midheaven = midheaven (aka M.C.) in degrees
  // * float ascendant = ascendant in degrees
  // * float latitude = latitude of origin in degrees
  // * float obliquityEcliptic = obliquity of ecliptic in degrees
  //////////

  const cuspInterval = (houseNumber) => {
    // returns => n in degrees
    switch (houseNumber) {
      case 2:
        return 120;
      case 3:
        return 150;
      case 11:
        return 30;
      case 12:
        return 60;
    }
  };

  const equatorialInterval = (houseNumber) => {
    // returns => n in degrees
    switch (houseNumber) {
      case 2:
        return rightAscensionMC + cuspInterval(houseNumber);
        break;
      case 3:
        return rightAscensionMC + cuspInterval(houseNumber);
        break;
      case 11:
        return rightAscensionMC + cuspInterval(houseNumber);
        break;
      case 12:
        return rightAscensionMC + cuspInterval(houseNumber);
        break;
    }
  };

  const housePole = (houseNumber) =>
    // returns => in radians
    Math.atan(tanFromDegrees(latitude) * sinFromDegrees(cuspInterval(houseNumber)));

  const calculatedCusp = (houseNumber) => {
    const eqint = equatorialInterval(houseNumber);
    // First intermediate value
    const m = Math.atan(Math.tan(housePole(houseNumber)) / cosFromDegrees(eqint)); // radians

    // Intermediate house cusps
    const r = Math.atan((tanFromDegrees(eqint) * Math.cos(m)) / Math.cos(m + degreesToRadians(obliquityEcliptic))); // radians

    return radiansToDegrees(r);
  };

  return calculateCusps1(ascendant, midheaven, calculatedCusp);
};

export const calculateTopocentricHouseCusps = ({
  rightAscensionMC = 0.00, midheaven = 0.00, ascendant = 0.00, latitude = 0.00, obliquityEcliptic = 23.4367,
} = {}) => {
  // The house system was invented by the Hungarian-Argentinian astrologer Wendel Polich (1892-1979) and the English-Argentinian astrologer Anthony Nelson Page (1919-1970). The topocentric system can also be described as an approximation algorithm for the Placidus system.
  // NOTE - known to perform irregularly at latitudes greater than +60 and less than -60
  // source: An Astrological House Formulary by Michael P. Munkasey, page 21
  // verified with https://astrolibrary.org/compare-house-systems/
  //////////
  // * float rightAscensionMC = localSiderealTime converted to degrees
  // * float midheaven = midheaven (aka M.C.) in degrees
  // * float ascendant = ascendant in degrees
  // * float latitude = latitude of origin in degrees
  // * float obliquityEcliptic = obliquity of ecliptic in degrees
  //////////

  const cuspInterval = (houseNumber) => {
    // returns => n in degrees
    switch (houseNumber) {
      case 2:
        return rightAscensionMC + 120;
        break;
      case 3:
        return rightAscensionMC + 150;
        break;
      case 11:
        return rightAscensionMC + 30;
        break;
      case 12:
        return rightAscensionMC + 60;
        break;
    }
  };

  const semiArcRatio = (houseNumber) => {
    switch (houseNumber) {
      case 2:
        return Math.atan(2 * (tanFromDegrees(latitude) / 3));
      case 3:
        return Math.atan(tanFromDegrees(latitude) / 3);
      case 11:
        return Math.atan(tanFromDegrees(latitude) / 3);
      case 12:
        return Math.atan(2 * (tanFromDegrees(latitude) / 3));
    }
  };

  const calculatedCusp = (houseNumber) => {
    // First intermediate value
    const m = Math.atan(Math.tan(semiArcRatio(houseNumber)) / cosFromDegrees(cuspInterval(houseNumber))); // radians

    // Intermediate house cusps
    const r = Math.atan((tanFromDegrees(cuspInterval(houseNumber)) * Math.cos(m)) / Math.cos(m + degreesToRadians(obliquityEcliptic))); // radians

    return radiansToDegrees(r);
  };

  return calculateCusps1(ascendant, midheaven, calculatedCusp);
};

export const calculateEqualHouseCusps = ({ ascendant = 0.00, zodiac = 'tropical' } = {}) =>
  // The ascendant is taken as the first house and each house is 30 degrees further along the zodiac
  //////////
  // * float ascendant
  // returns => [1..12] (array of 12 floats marking the cusp of each house)
  /////////
  new Array(12).fill(undefined).map((el, index) => {
    const startingDegree = ascendant;
    return parseFloat(modulo(index ? (index * 30) + startingDegree : index + startingDegree, 360).toFixed(4));
  });
export const calculateWholeSignHouseCusps = ({ ascendant = 0.00, zodiac = 'tropical' } = {}) => {
  // The ascendant's zodiac position is taken as the first house and each house is assigned to each of the signs in zodiacal order, with each of the twelve houses exactly coinciding with the start and end of each sign
  //////////
  // * float ascendant
  // returns => [1..12] (array of 12 floats marking the cusp of each house)
  /////////
  // const startingDegree = Math.floor(applyZodiacOffsetCounter(ascendant, zodiac) / 30) * 30
  // const startingDegree = Math.floor(ascendant / 30) * 30
  const ascendantSign = getZodiacSign({ decimalDegrees: ascendant, zodiac });
  const startingDegree = ascendantSign.ZodiacStart;

  return Sign.OfType(zodiac).map((sign) => {
    const cuspStart = modulo(sign.ZodiacStart + startingDegree, 360);

    return cuspStart;
  });
};

export const calculateCampanusHouseCusps = ({
  rightAscensionMC = 0.00, midheaven = 0.00, ascendant = 0.00, latitude = 0.00, obliquityEcliptic = 23.4367,
} = {}) => {
  // Source:
  // Dividing the Heavens by Leonard Wiliams, pg 101

  const f = degreesToRadians(parseFloat(latitude));
  const e = degreesToRadians(obliquityEcliptic);
  const rightAscensionIC = modulo(rightAscensionMC + 180, 360);

  const a30 = degreesToRadians(30.0);
  const a60 = degreesToRadians(60.0);
  const a90 = degreesToRadians(90.0);
  const a180 = degreesToRadians(180.0);
  const a270 = degreesToRadians(270.0);
  const a360 = degreesToRadians(360.0);

  const calculateNorthernCuspAngleEcliptic = (oahc, qhc) => {
    // For northern hemisphere
    // oahc and qhc should come in as radians
    // returns radians

    const degoahc = radiansToDegrees(oahc);

    const f1 = Math.cos(e) * Math.sin(qhc);
    const f2 = Math.sin(e) * Math.cos(qhc) * Math.cos(oahc);
    const f3 = -Math.cos(e) * Math.sin(qhc);
    let a = 0;
    let c = 0;
    if (degoahc === 360 || degoahc < 90) {
      a = Math.acos(f1 + f2);
      const coahc = Math.acos(Math.tan(e) * Math.tan(qhc));
      const g = Math.asin((Math.cos(qhc) * Math.sin(oahc)) / Math.sin(a));

      if (oahc < coahc) {
        c = g;
      } else if (oahc === coahc) {
        c = a90;
      } else if (oahc > coahc) {
        c = a180 - g;
      }
    } else if (degoahc >= 90 && degoahc < 180) {
      a = Math.acos(f3 - f2);
      const g = Math.acos((Math.cos(qhc) * Math.cos(oahc - a90)) / Math.sin(a));

      c = a90 + g;
    } else if (degoahc >= 180 && degoahc < 270) {
      a = Math.acos(f3 - f2);
      const g = Math.asin((Math.cos(qhc) * Math.sin(oahc - a180)) / Math.sin(a));

      c = a180 + g;
    } else if (degoahc >= 270 && degoahc < 360) {
      a = Math.acos(f1 + f2);
      const g = Math.acos((Math.cos(qhc) * Math.cos(oahc - a270)) / Math.sin(a));

      const coahc = a360 - Math.acos(Math.tan(e) * Math.tan(qhc));

      if (oahc < coahc) {
        c = a270 - g;
      } else if (oahc === coahc) {
        c = a270;
      } else if (oahc > coahc) {
        c = a270 + g;
      }
    }

    return c;
  };

  const calculateSouthernCuspAngleEcliptic = (oahc, qhc) => {
    // for Southern hemisphere
    // oahc and qhc should come in as radians
    // returns radians
    const degoahc = radiansToDegrees(oahc);

    const f1 = Math.cos(e) * Math.sin(qhc);
    const f2 = Math.sin(e) * Math.cos(qhc) * Math.cos(oahc);
    const f3 = -Math.cos(e) * Math.sin(qhc);
    let a = 0;
    let c = 0;
    if (degoahc === 360 || degoahc < 90) {
      a = Math.acos(f3 + f2);
      const g = Math.asin((Math.cos(qhc) * Math.sin(oahc)) / Math.sin(a));
      c = g;
    } else if (degoahc >= 90 && degoahc < 180) {
      a = Math.acos(f1 - f2);
      const coahc = Math.acos(-Math.tan(e) * Math.tan(qhc));

      const g = Math.acos((Math.cos(qhc) * Math.cos(oahc - a90)) / Math.sin(a));

      if (oahc < coahc) {
        c = a90 - g;
      } else if (oahc === coahc) {
        c = a90;
      } else if (oahc > coahc) {
        c = a90 + g;
      }
    } else if (degoahc >= 180 && degoahc < 270) {
      a = Math.acos(f1 - f2);
      const coahc = a360 - Math.acos(-Math.tan(e) * Math.tan(qhc));

      const g = Math.asin((Math.cos(qhc) * Math.sin(oahc - a180)) / Math.sin(a));
      if (oahc < coahc) {
        c = a180 + g;
      } else if (oahc === coahc) {
        c = a270;
      } else if (oahc > coahc) {
        c = a360 - g;
      }
    } else if (degoahc >= 270 && degoahc < 360) {
      a = Math.acos(f3 + f2);
      const g = Math.acos((Math.cos(qhc) * Math.cos(oahc - a270)) / Math.sin(a));

      c = a270 + g;
    }

    return c;
  };

  const calculateNorthernCircumpolarCuspAngleEcliptic = (oahc, qhc) => {
    // For northern circumpolar (latitudes within 90 - OE)
    // oahc and qhc should come in as radians
    // returns radians

    const degoahc = radiansToDegrees(oahc);

    const f1 = Math.cos(e) * Math.sin(qhc);
    const f2 = Math.sin(e) * Math.cos(qhc) * Math.cos(oahc);
    const f3 = -Math.cos(e) * Math.sin(qhc);

    let a = 0;
    let c = 0;
    if (degoahc === 360 || degoahc < 90) {
      a = Math.acos(f3 + f2);
      const g = Math.asin((Math.cos(qhc) * Math.sin(oahc)) / Math.sin(a));

      c = g;
    } else if (degoahc >= 90 && degoahc < 180) {
      a = Math.acos(f1 - f2);
      const coahc = Math.acos(-Math.tan(e) * Math.tan(qhc));
      const g = Math.acos((Math.cos(qhc) * Math.cos(oahc - a90)) / Math.sin(a));

      if (oahc < coahc) {
        c = a90 - g;
      } else if (oahc === coahc) {
        c = a90;
      } else if (oahc > coahc) {
        c = a90 + g;
      }
    } else if (degoahc >= 180 && degoahc < 270) {
      a = Math.acos(f1 - f2);
      const g = Math.asin((Math.cos(qhc) * Math.sin(oahc - a180)) / Math.sin(a));

      const coahc = a360 - Math.acos(-Math.tan(e) * Math.tan(qhc));

      if (oahc < coahc) {
        c = a180 + g;
      } else if (oahc === coahc) {
        c = a270;
      } else if (oahc > coahc) {
        c = a360 - g;
      }
    } else if (degoahc >= 270 && degoahc < 360) {
      a = Math.acos(f3 + f2);
      const g = Math.acos((Math.cos(qhc) * Math.cos(oahc - a270)) / Math.sin(a));

      c = a270 + g;
    }

    return c;
  };

  const calculateSouthernCircumpolarCuspAngleEcliptic = (oahc, qhc) => {
    // For southern circumpolar (latitudes within -90 + OE)
    // oahc and qhc should come in as radians
    // returns radians

    const degoahc = radiansToDegrees(oahc);

    const f1 = Math.cos(e) * Math.sin(qhc);
    const f2 = Math.sin(e) * Math.cos(qhc) * Math.cos(oahc);
    const f3 = -Math.cos(e) * Math.sin(qhc);
    let a = 0;
    let c = 0;
    if (degoahc === 360 || degoahc < 90) {
      a = Math.acos(f3 + f2);
      const g = Math.asin((Math.cos(qhc) * Math.sin(oahc)) / Math.sin(a));

      c = g;
    } else if (degoahc >= 90 && degoahc < 180) {
      a = Math.acos(f1 - f2);
      const coahc = Math.acos(-Math.tan(e) * Math.tan(qhc));

      const g = Math.acos((Math.cos(qhc) * Math.cos(oahc - a90)) / Math.sin(a));

      if (oahc < coahc) {
        c = a90 - g;
      } else if (oahc === coahc) {
        c = a90;
      } else if (oahc > coahc) {
        c = a90 + g;
      }
    } else if (degoahc >= 180 && degoahc < 270) {
      a = Math.acos(f1 - f2);
      const coahc = a360 - Math.acos(-Math.tan(e) * Math.tan(qhc));
      const g = Math.asin((Math.cos(qhc) * Math.sin(oahc - a180)) / Math.sin(a));

      if (oahc < coahc) {
        c = a180 + g;
      } else if (oahc === coahc) {
        c = a270;
      } else if (oahc > coahc) {
        c = a360 - g;
      }
    } else if (degoahc >= 270 && degoahc < 360) {
      a = Math.acos(f3 + f2);
      const g = Math.acos((Math.cos(qhc) * Math.cos(oahc - a270)) / Math.sin(a));

      c = a270 + g;
    }

    return c;
  };

  const isNorthernCircumpolar = latitude > 90 - obliquityEcliptic;
  const isNorthernHemisphere = latitude >= 0 && !isNorthernCircumpolar;
  const isSouthernCircumpolar = latitude < -90 + obliquityEcliptic;
  const isSouthernHemisphere = latitude < 0 && !isSouthernCircumpolar;
  let useNorthernHemisphere = false; // toggle this flag if northern circumpolar pceds warrent using northern hemisphere instead of northern circumpolar
  let useSouthernHemisphere = false; // toggle this flag if southern circumpolar pceds warrent using southern hemisphere instead of southern circumpolar

  const declHorizon = a90 - f;

  const c1 = ascendant;
  const c7 = modulo(c1 + 180, 360);
  const c10 = midheaven;
  const c4 = modulo(midheaven + 180, 360);

  if (isNorthernCircumpolar) {
    const pced1 = a180 + Math.asin(Math.tan(declHorizon) / Math.tan(e));
    const pced2 = a360 - Math.asin(Math.tan(declHorizon) / Math.tan(e));

    if (rightAscensionMC < pced1 && rightAscensionMC > pced2) {
      // use standard northern hemisphere calculation under these conditions
      useNorthernHemisphere = true;
    }
  } else if (isSouthernCircumpolar) {
    const pced1 = Math.asin(Math.tan(declHorizon) / Math.tan(e));
    const pced2 = a180 - Math.asin(Math.tan(declHorizon) / Math.tan(e));

    if (rightAscensionMC < pced1 && rightAscensionMC > pced2) {
      // use standard northern hemisphere calculation under these conditions
      useSouthernHemisphere = true;
    }
  }

  let oa2;
  let oa3;
  let oa11;
  let oa12;

  if (isNorthernHemisphere || useNorthernHemisphere || isSouthernHemisphere || useSouthernHemisphere) {
    // use standard calculations
    oa2 = Math.abs(degreesToRadians(rightAscensionIC) - Math.atan(Math.cos(f) * Math.tan(a60)));
    oa3 = Math.abs(degreesToRadians(rightAscensionIC) - Math.atan(Math.cos(f) * Math.tan(a30)));
    oa11 = Math.abs(degreesToRadians(rightAscensionMC) + Math.atan(Math.cos(f) * Math.tan(a30)));
    oa12 = Math.abs(degreesToRadians(rightAscensionMC) + Math.atan(Math.cos(f) * Math.tan(a60)));
  } else {
    // use circumpolar calculations (for both north / south if warrented by pceds)

    oa2 = Math.abs(degreesToRadians(rightAscensionIC) + Math.atan(Math.cos(f) * Math.tan(a60)));
    oa3 = Math.abs(degreesToRadians(rightAscensionIC) + Math.atan(Math.cos(f) * Math.tan(a30)));
    oa11 = Math.abs(degreesToRadians(rightAscensionMC) - Math.atan(Math.cos(f) * Math.tan(a30)));
    oa12 = Math.abs(degreesToRadians(rightAscensionMC) - Math.atan(Math.cos(f) * Math.tan(a60)));
  }

  const q2 = Math.abs(Math.asin(Math.sin(f) * Math.sin(a60)));
  const q12 = Math.abs(Math.asin(Math.sin(f) * Math.sin(a60)));
  const q3 = Math.abs(Math.asin(Math.sin(f) * Math.sin(a30)));
  const q11 = Math.abs(Math.asin(Math.sin(f) * Math.sin(a30)));

  let c2 = 0;
  let c3 = 0;
  let c11 = 0;
  let c12 = 0;

  if (isNorthernCircumpolar && !useNorthernHemisphere) {
    // northern circumpolar
    c2 = radiansToDegrees(calculateNorthernCircumpolarCuspAngleEcliptic(oa2, q2));
    c3 = radiansToDegrees(calculateNorthernCircumpolarCuspAngleEcliptic(oa3, q3));
    c11 = radiansToDegrees(calculateNorthernCircumpolarCuspAngleEcliptic(oa11, q11));
    c12 = radiansToDegrees(calculateNorthernCircumpolarCuspAngleEcliptic(oa12, q12));
  } else if (isNorthernHemisphere || useNorthernHemisphere) {
    // northern hemisphere
    c2 = radiansToDegrees(calculateNorthernCuspAngleEcliptic(oa2, q2));
    c3 = radiansToDegrees(calculateNorthernCuspAngleEcliptic(oa3, q3));
    c11 = radiansToDegrees(calculateNorthernCuspAngleEcliptic(oa11, q11));
    c12 = radiansToDegrees(calculateNorthernCuspAngleEcliptic(oa12, q12));
  } else if (isSouthernHemisphere || useSouthernHemisphere) {
    // southern hemisphere
    c2 = radiansToDegrees(calculateSouthernCuspAngleEcliptic(oa2, q2));
    c3 = radiansToDegrees(calculateSouthernCuspAngleEcliptic(oa3, q3));
    c11 = radiansToDegrees(calculateSouthernCuspAngleEcliptic(oa11, q11));
    c12 = radiansToDegrees(calculateSouthernCuspAngleEcliptic(oa12, q12));
  } else if (isSouthernCircumpolar && !useSouthernHemisphere) {
    // southern circumpolar
    c2 = radiansToDegrees(calculateSouthernCircumpolarCuspAngleEcliptic(oa2, q2));
    c3 = radiansToDegrees(calculateSouthernCircumpolarCuspAngleEcliptic(oa3, q3));
    c11 = radiansToDegrees(calculateSouthernCircumpolarCuspAngleEcliptic(oa11, q11));
    c12 = radiansToDegrees(calculateSouthernCircumpolarCuspAngleEcliptic(oa12, q12));
  }

  const c5 = modulo(c11 + 180, 360);
  const c6 = modulo(c12 + 180, 360);
  const c8 = modulo(c2 + 180, 360);
  const c9 = modulo(c3 + 180, 360);

  return [
    modulo(c1, 360).toFixed(4),
    modulo(c2, 360).toFixed(4),
    modulo(c3, 360).toFixed(4),
    modulo(c4, 360).toFixed(4),
    modulo(c5, 360).toFixed(4),
    modulo(c6, 360).toFixed(4),
    modulo(c7, 360).toFixed(4),
    modulo(c8, 360).toFixed(4),
    modulo(c9, 360).toFixed(4),
    modulo(c10, 360).toFixed(4),
    modulo(c11, 360).toFixed(4),
    modulo(c12, 360).toFixed(4),
  ];
};
