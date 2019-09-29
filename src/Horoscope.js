import { getMidheavenSun, getascendant } from './utilities/astronomy'

import { calculateEqualHouseCusps, calculateKochHouseCusps, calculatePlacidianHouseCusps, calculateRegiomontanusHouseCusps, calculateTopocentricHouseCusps, calculateWholeSignHouseCusps } from './utilities/astrology'
import { signs } from './utilities/signs'
import moment from 'moment-timezone'

//////////
// Horoscope
//////////
// This class contains horoscope chart calculations
/////////
// * Origin origin: instance of the Origin class
// * string houseSystem: a string from the list assigned to Horoscope.HouseSystems in the constructor.

class Horoscope {
  constructor({origin = null, houseSystem='placidus', zodiac='tropical'}={}) {
    this.origin = origin
    this.midheaven = getMidheavenSun({localSiderealTime: origin.localSiderealTime})
    this.ascendant = getascendant({latitude: origin.latitude, localSiderealTime: origin.localSiderealTime})
    this.houseSystem = this.validateHouseSystem(houseSystem)
    this.houseCusps = this.calculateHouseCusps(this.houseSystem)
    this.validateHouseSystem = this.validateHouseSystem.bind(this)
    this.zodiac = this.validateZodiac(zodiac.toLowerCase())
    this.sunSign = this.getSunSign(this.zodiac)
    this.getSunSign = this.getSunSign.bind(this)
    this.getTropicalSign = this.getTropicalSign.bind(this)
    this.getAstronomicalSign = this.getAstronomicalSign.bind(this)
    this.validateZodiac = this.validateZodiac.bind(this)
  }

  static get HouseSystems() {
    return ['equal house', 'koch', 'placidus', 'regiomontanus', 'topocentric', 'whole sign']
  }

  validateHouseSystem(string) {
    if (Horoscope.HouseSystems.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" house system is not included. Please choose from the following list: ${Horoscope.HouseSystems.join(', ')}.`)
  }

  static get Zodiacs() {
    return ['astronomical', 'sidereal', 'tropical']
  }

  validateZodiac(string) {
    if (Horoscope.Zodiacs.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" zodiac is not included. Please choose from the following list: ${Horoscope.Zodiacs.join(', ')}.`)
  }

  calculateHouseCusps(string) {
    switch (string) {
      case 'equal house':
        return calculateEqualHouseCusps({ascendant: this.ascendant})
      case 'koch':
        return calculateKochHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.midheaven, ascendant: this.ascendant, latitude: this.origin.latitude})
      case 'placidus':
        return calculatePlacidianHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.midheaven, ascendant: this.ascendant, latitude: this.origin.latitude})
      case 'regiomontanus':
        return calculateRegiomontanusHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.midheaven, ascendant: this.ascendant, latitude: this.origin.latitude})
      case 'topocentric':
        return calculateTopocentricHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.midheaven, ascendant: this.ascendant, latitude: this.origin.latitude})
      case 'whole sign':
        return calculateWholeSignHouseCusps({ascendant: this.ascendant})
      default:
        return calculatePlacidianHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.midheaven, ascendant: this.ascendant, latitude: this.origin.latitude})
    }
  }

  getSunSign(zodiac) {
    // Source: https://horoscopes.lovetoknow.com/about-astrology/new-horoscope-dates
    // Astronomical dates from IAU and slightly altered to be computed without times.
    // Pending a better solution, all astronimical zodiac end dates are offset by -1

    switch(zodiac) {
      case 'tropical':
        return this.getTropicalSign()
      case 'sidereal':
        return this.getSiderealSign()
      case 'astronomical':
        return this.getAstronomicalSign()
    }
  }

  getTropicalSign() {
    const sign = signs.find(sign => {
      const startDate = moment.tz({month: sign.tropicalStartMonth, date: sign.tropicalStartDate, hour: 0}, 'UTC').startOf('day')
      const endDate = moment.tz({month: sign.tropicalEndMonth, date: sign.tropicalEndDate, year: startDate.month() === 11 && sign.tropicalEndMonth === 0 ? startDate.year() + 1 : startDate.year()}, 'UTC').endOf('day')
      return this.origin.utcTime.isBetween(startDate, endDate, null, '[]')
    })

    return sign
  }

  getSiderealSign() {
    const sign = signs.find(sign => {
      const startDate = moment({month: sign.siderealStartMonth, date: sign.siderealStartDate, hour: 0}).startOf('day')
      const endDate = moment({month: sign.siderealEndMonth, date: sign.siderealEndDate, year: startDate.month() === 11 && sign.siderealEndMonth === 0 ? startDate.year() + 1 : startDate.year()}).endOf('day')
      return this.origin.utcTime.isBetween(startDate, endDate, null, '[]')
    })

    return sign
  }

  getAstronomicalSign() {
    const sign = signs.find(sign => {
      const startDate = moment({month: sign.astronomicalStartMonth, date: sign.astronomicalStartDate, hour: 0}).startOf('day')
      const endDate = moment({month: sign.astronomicalEndMonth, date: sign.astronomicalEndDate, year: startDate.month() === 11 && sign.astronomicalEndMonth === 0 ? startDate.year() + 1 : startDate.year()}).endOf('day')
      return this.origin.utcTime.isBetween(startDate, endDate, null, '[]')
    })

    return sign
  }
}

export default Horoscope
