import moment from 'moment'

export const arccot = (x) => {
  // calculates the arc-cotangent
  // https://stackoverflow.com/a/39244477/6826976
  return Math.PI / 2 - Math.atan(x)
}

export const degreesToRadians = degrees => {
  // https://www.rapidtables.com/convert/number/degrees-to-radians.html
  return degrees * (Math.PI / 180)
}

export const radiansToDegrees = radians => {
  // https://www.rapidtables.com/convert/number/degrees-to-radians.html
  return radians * (180 / Math.PI)
}

export const modulo = (number, mod) => {
  // Modulo function which works with negative numbers
  // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
  ///////////
  // * float number = the primary number to compute on
  // * float mod = the modulating number
  // => Returns Float
  ///////////

  return (number % mod + mod) % mod
}

export const hourTimeToDecimal = ({hour=0, minute=0}={}) => {
  // HH:MM time format => Float
  // ex: 1:30 => 1.5
  // ex: 23.25 => 23.25
  return moment.duration(`${hour}:${minute}`).asHours()
}

export const decimalTimeToHour = ({decimal=0}={}) => {
  // Float => HH:MM time format
  // ex: 1.5 => 1:30
  // ex: 23.25 => 23:15
  return moment.duration(decimal, 'hours')
}

export const decimalDegreesToDMS = (decimalDegrees) => {
  // converts decimal degrees to degrees / minutes / seconds
  // https://stackoverflow.com/a/5786627/6826976
  // * float decimalDegrees
  // => returns { degrees, minutes, seconds }
  let degrees = Math.floor(decimalDegrees)
  let minfloat = (decimalDegrees - degrees) * 60
  let minutes = Math.floor(minfloat)
  let secfloat = (minfloat - minutes) * 60
  let seconds = Math.round(secfloat)

  // After rounding, the seconds might become 60. These two
  // if-tests are not necessary if no rounding is done.
  if (seconds === 60) {
   minutes++
   s = 0
  }

  if (minutes === 60) {
   degrees++
   minutes = 0
  }

  return {
    degrees: degrees,
    minutes: minutes,
    seconds: seconds
  }
}
