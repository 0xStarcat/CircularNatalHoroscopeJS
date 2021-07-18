import moment from 'moment';

export const arccot = (x) =>
  // calculates the arc-cotangent
  // https://stackoverflow.com/a/39244477/6826976
  Math.PI / 2 - Math.atan(x);

export const degreesToRadians = (degrees) =>
  // https://www.rapidtables.com/convert/number/degrees-to-radians.html
  degrees * (Math.PI / 180);
export const radiansToDegrees = (radians) =>
  // https://www.rapidtables.com/convert/number/degrees-to-radians.html
  radians * (180 / Math.PI);

export const sinFromDegrees = (degrees) => Math.sin(degreesToRadians(degrees));

export const cosFromDegrees = (degrees) => Math.cos(degreesToRadians(degrees));

export const tanFromDegrees = (degrees) => Math.tan(degreesToRadians(degrees));

export const modulo = (number, mod) =>
  // Modulo function which works with negative numbers
  // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
  ///////////
  // * float number = the primary number to compute on
  // * float mod = the modulating number
  // => Returns Float
  ///////////

  (number % mod + mod) % mod;
export const hourTimeToDecimal = ({ hour = 0, minute = 0 } = {}) =>
  // HH:MM time format => Float
  // ex: 1:30 => 1.5
  // ex: 23.25 => 23.25
  moment.duration(`${hour}:${minute}`).asHours();
export const decimalTimeToHour = ({ decimal = 0 } = {}) =>
  // Float => HH:MM time format
  // ex: 1.5 => 1:30
  // ex: 23.25 => 23:15
  moment.duration(decimal, 'hours');
export const decimalDegreesToDMS = (decimalDegrees) => {
  // converts decimal degrees to degrees / minutes / seconds
  // https://stackoverflow.com/a/5786627/6826976
  // * float decimalDegrees
  // => returns { degrees, minutes, seconds }
  let degrees = Math.floor(decimalDegrees);
  const minfloat = (decimalDegrees - degrees) * 60;
  let minutes = Math.floor(minfloat);
  const secfloat = (minfloat - minutes) * 60;
  let seconds = Math.round(secfloat);

  // After rounding, the seconds might become 60. These two
  // if-tests are not necessary if no rounding is done.
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }

  if (minutes === 60) {
    degrees++;
    minutes = 0;
  }

  return {
    degrees,
    minutes,
    seconds,
  };
};

export const isDegreeWithinCircleArc = (arcLow, arcHigh, degree, edges = '[)') => {
  // Calculates if a point ("degree") is within an arc between "arcLow" and "arcHigh" within a circle.
  // With parameters for low/high inclusive or exclusive.
  // [] = low/high inclusive
  // () = low/high exclusive
  const operators = {
    '[': (a, b) => a >= b,
    '(': (a, b) => a > b,
    ']': (a, b) => a <= b,
    ')': (a, b) => a < b,
  };

  const lowComparison = operators[edges.split('')[0]];
  const highComparison = operators[edges.split('')[1]];

  if (arcLow > arcHigh) {
    arcHigh += 360;

    if (degree < arcLow) {
      degree += 360;
    }
  }

  return lowComparison(degree, arcLow) && highComparison(degree, arcHigh);
};

export const getModuloDifference = (point1, point2) => {
  // https://math.stackexchange.com/a/185842
  // returns the difference in degrees between 2 points, regardless of their position on a circle

  const high = Math.max(point1, point2);
  const low = Math.min(point1, point2);

  return Math.min(high - low, 360 + low - high);
  // if (point2 >= point1) {
  //   return point2 - point1
  // } else if (point1 > point2) {
  //   point2 = point2 + 360
  //   return point2 - point1
  // }
};
