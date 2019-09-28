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

class Origin {
  constructor({year = 0, month = 0, date = 0, hour = 0, minute = 0, latitude = 0.00, longitude = 0.00}={}) {

    this.year = this.ValidateYear(year)
    this.month = this.ValidateMonth(month)
    this.date = this.ValidateDate(date)
    this.hour = this.ValidateHour(hour)
    this.minute = this.ValidateMinute(minute)
    this.latitude = this.ValidateLatitude(latitude)
    this.longitude = this.ValidateLongitude(longitude)

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
      year: this.utcTime.year(),
      month: this.utcTime.month() + 1,
      date: this.utcTime.date(),
      ut: hourTimeToDecimal({ hour: this.utcTime.hours(), minute: this.utcTime.minutes() })
    })
    this.localSiderealTime = getLocalSiderealTime({
                                                    jd: this.julianDate,
                                                    longitude: parseFloat(this.longitude)
                                                  })

    this.ValidateYear = this.ValidateYear.bind(this)
    this.ValidateMonth = this.ValidateMonth.bind(this)
    this.ValidateDate = this.ValidateDate.bind(this)
    this.ValidateHour = this.ValidateHour.bind(this)
    this.ValidateMinute = this.ValidateMinute.bind(this)
    this.ValidateLatitude = this.ValidateLatitude.bind(this)
    this.ValidateLongitude = this.ValidateLongitude.bind(this)
  }

  ValidateYear(year) {
    if (year > 0) return year
    else throw new Error(`The year: "${year}" - must be an integer and > 0 (C.E.)`)
  }

  ValidateMonth(month) {
    if (month >= 0 && month <= 11) return month
    else throw new Error(`The month: "${month}" - must be an integer and between 0 - 11. (0 = January, 11 = December)`)
  }

  ValidateDate(date) {
    if (date >= 1 && date <= 31) return date
    else throw new Error(`The date: "${date} must be between 1 - 31`)
  }

  ValidateHour(hour) {
    if (hour >= 0 && hour <= 23) return hour
    else throw new Error(`The hour: "${hour}" - must be an integer and between 0 - 23. (0 = midnight 00:00, 23 = 11pm (23:00))`)
  }

  ValidateMinute(minute) {
    if (minute >= 0 && minute <= 59) return minute
    else throw new Error(`The minute: "${minute}" - must be an integer and between 0 - 59`)
  }

  ValidateLatitude(latitude) {
    if (latitude >= -90 && latitude <= 90) return latitude
    else throw new Error(`The latitude: "${latitude}" - must be an float and between -90.00 to 90.00`)
  }

  ValidateLongitude(longitude) {
    if (longitude >= -180 && longitude <= 180) return longitude
    else throw new Error(`The longitude: "${longitude}" - must be an float and between -180.00 to 180.00`)
  }
}

export default Origin
