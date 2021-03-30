import moment from 'moment-timezone'
import tzlookup from 'tz-lookup'

import { hourTimeToDecimal } from './utilities/math'
import { getJulianDate, getLocalSiderealTime } from './utilities/astronomy'
import {
  validateYear,
  validateMonth,
  validateDate,
  validateHour,
  validateMinute,
  validateLatitude,
  validateLongitude
} from './utilities/validators'

//////////
// Origin
//////////
// This class contains the base data components required for a chart casting.
// It automatically derives the local timezone from latitude/longitude coordinates
// and calculates UTC time with respect to timezone and historical daylight savings time.
// Only works for C.E. date (> 0).
// Keep dependency tz-lookup updated to reflect most recent timezone practices.
/////////
// * int year: value >= 0 C.E.
// * int month: (0 = january ...11 = december)
// * int date: (1...31)
// * int hours = local time - hours value (0...23)
// * int minute = local time - minute value (0...59)
// * float latitude = latitude in decimal format (-90.00...90.00)
// * float longitude = longitude in decimal format (-180.00...180.00)

export class Origin {
  constructor({ year = 0, month = 0, date = 0, hour = 0, minute = 0, second = 0, latitude = 0.00, longitude = 0.00 } = {}) {

    this.year = validateYear(year)
    this.month = validateMonth(month)
    this.date = validateDate(date)
    this.hour = validateHour(hour)
    this.minute = validateMinute(minute)
    this.latitude = validateLatitude(latitude)
    this.longitude = validateLongitude(longitude)

    this.timeObject = {
      year: year,
      month: month,
      date: date,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: 0
    }

    this.latitude = latitude
    this.longitude = longitude
    this.timezone = moment.tz.zone(tzlookup(this.latitude, this.longitude));
    this.localTime = moment.tz(this.timeObject, this.timezone.name);
    this.localTimeFormatted = this.localTime.format();
    this.utcTime = moment.tz(this.timeObject, this.timezone.name).utc(); // `.utc()` mutates the original localTime so don't call it on this.localTime itself.
    this.utcTimeFormatted = this.utcTime.format();
    this.julianDate = getJulianDate({
      year: this.utcTime.year(),
      month: this.utcTime.month() + 1,
      date: this.utcTime.date(),
      ut: hourTimeToDecimal({ hour: this.utcTime.hours(), minute: this.utcTime.minutes(), second: this.utcTime.seconds() })
    })
    this.localSiderealTime = getLocalSiderealTime({
      jd: this.julianDate,
      longitude: parseFloat(this.longitude)
    })
  }
}

export default Origin
