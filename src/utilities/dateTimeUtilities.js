import moment from 'moment'

export const getJulianDate = ({year=0, month=0, date=0, ut=0}={}) => {
  // From http://scienceworld.wolfram.com/astronomy/JulianDate.html
  // "Fundamentals of Celestial Mechanics 2nd Edition" by Danby (1988)
  // Only works for calculations with calendar dates > 1 C.E.
  // * int year
  // * int month (1 - 12)
  // * int date
  // * float ut

  return  (367 * year) -
          Math.floor(7 * (year + Math.floor((month + 9) / 12)) / 4) -
          Math.floor(3 * (Math.floor((year + (month - 9) / 7) / 100) + 1) / 4) +
          Math.floor((275 * month) / 9) +
          date +
          1721028.5 +
          (ut / 24)
}

export const hourTimeToDecimal = ({hour=0, minute=0}={}) => {
  return moment.duration(`${hour}:${minute}`).asHours()
}

export const decimalTimeToHour = ({decimal=0}={}) => {
  return moment.duration(decimal, 'hours')
}
