import moment from 'moment'

export const getJulianDate = ({year=0, month=0, date=0, ut=0}={}) => {
  // From http://scienceworld.wolfram.com/astronomy/JulianDate.html
  // Source: "Fundamentals of Celestial Mechanics 2nd Edition" by Danby (1988)
  // Works with calendar dates > 1 C.E.
  // Tested with https://aa.usno.navy.mil/data/docs/JulianDate.php
  // * int year (1...)
  // * int month (1...12)
  // * int date = (1...31)
  // * float ut = universal time
  // => Returns Float || the Julian Date given the specific Gregorian calendar date

  return  (367 * year) -
          Math.floor(7 * (year + Math.floor((month + 9) / 12)) / 4) -
          Math.floor(3 * (Math.floor((year + (month - 9) / 7) / 100) + 1) / 4) +
          Math.floor((275 * month) / 9) +
          date +
          1721028.5 +
          (ut / 24)
}

export const getLocalSiderealTime = ({jd = 0, longitude = 0}={}) => {
  // Source: Astronomical Algorithims by Jean Meeus (1991)
  // Tested with http://neoprogrammics.com/sidereal_time_calculator/index.php
  // * float jd = julian date decimal
  // * float longitude = local longitude in decimal form
  // => returns Float || the sidereal time in arc degrees (0...359)

  const julianDaysJan1st2000 = 2451545.0
  const julianDaysSince2000 = jd - julianDaysJan1st2000
  const tFactor = (julianDaysSince2000) / 36525 // centuries
  const degreesRotationInSiderealDay = 360.98564736629
  const lst = 280.46061837 +
              (degreesRotationInSiderealDay * (julianDaysSince2000)) +
              0.000387933 * Math.pow(tFactor, 2) -
              (Math.pow(tFactor, 3) / 38710000) +
              longitude

  const modLst = parseFloat(lst) % 360 // mod 360
  return modLst >= 0 ? modLst : modLst + 360 // ensure value is >= 0

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
