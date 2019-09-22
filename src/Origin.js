import moment from 'moment-timezone'
import tzlookup from 'tz-lookup'

import { hourTimeToDecimal } from './utilities/math'
import { getJulianDate, getLocalSiderealTime } from './utilities/astronomy'

//////////
// Origin
//////////
// This class contains the base data components required for a chart casting.
// It automatically derives the local timezone from latitude/longitude coordinates
// and calculates UTC time with respect to timezone and historical daylight savings time.
// Only works for C.E. dates (> 0).
// Keep dependency tz-lookup updated to reflect most recent timezone practices.
/////////
// * int year: value >= 0 C.E.
// * int month: (0 = january ...11 = december)
// * int date: (1...31)
// * int hours = local time - hours value (0...23)
// * int minute = local time - minute value (0...59)
// * float latitude = latitude in decimal format (-90.00...90.00)
// * float longitude = longitude in decimal format (-180.00...180.00)

class Origin {
  constructor({year = 0, month = 0, date = 0, hour = 0, minute = 0, latitude = 0.00, longitude = 0.00}={}) {

    this.timeObject = {
      year: year,
      month: month,
      date: date,
      hour: hour,
      minute: minute,
      second: 0,
      millisecond: 0
    }

    this.latitude = latitude
    this.longitude = longitude
    this.timezone = moment.tz.zone(tzlookup(this.latitude, this.longitude))
    this.localTime = moment.tz(this.timeObject, this.timezone.name)
    this.utcTime = moment.tz(this.timeObject, this.timezone.name).utc()
    this.julianDate = getJulianDate({
      year: this.utcTime.years(),
      month: this.utcTime.months() + 1,
      date: this.utcTime.dates(),
      ut: hourTimeToDecimal({ hour: this.utcTime.hours(), minute: this.utcTime.minutes() })
    })
    this.localSiderealTime = getLocalSiderealTime({
                                                    jd: this.julianDate,
                                                    longitude: parseFloat(this.longitude)
                                                  })
  }
}

export default Origin
