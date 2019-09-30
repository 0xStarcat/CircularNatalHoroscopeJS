import Sign from './Sign'
import ZodiacPosition from './ZodiacPosition'
import { getMidheavenSun, getAscendant } from './utilities/astronomy'
import { modulo } from './utilities/math'
import { calculateEqualHouseCusps, calculateKochHouseCusps, calculatePlacidianHouseCusps, calculateRegiomontanusHouseCusps, calculateTopocentricHouseCusps, calculateWholeSignHouseCusps, getZodiacSign } from './utilities/astrology'
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

    this._houseSystem = this.validateHouseSystem(houseSystem)
    this._zodiac = this.validateZodiac(zodiac.toLowerCase())

    this.getSunSign = this.getSunSign.bind(this)
    this.getTropicalSign = this.getTropicalSign.bind(this)
    this.getAstronomicalSign = this.getAstronomicalSign.bind(this)
    this.validateHouseSystem = this.validateHouseSystem.bind(this)
    this.validateZodiac = this.validateZodiac.bind(this)
    this.calculateHouseCusps = this.calculateHouseCusps.bind(this)
    this.calculateZodiacCusps = this.calculateZodiacCusps.bind(this)
  }

  static get HouseSystems() {
    return ['equal house', 'koch', 'placidus', 'regiomontanus', 'topocentric', 'whole sign']
  }

  validateHouseSystem(string) {
    if (Horoscope.HouseSystems.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" house system is not included. Please choose from the following list: ${Horoscope.HouseSystems.join(', ')}.`)
  }

  static get ZodiacSystems() {
    return ['astronomical', 'sidereal', 'tropical']
  }

  validateZodiac(string) {
    if (Horoscope.ZodiacSystems.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" zodiac is not included. Please choose from the following list: ${Horoscope.ZodiacSystems.join(', ')}.`)
  }

  get Midheaven() {
    const decimalDegrees = getMidheavenSun({localSiderealTime: this.origin.localSiderealTime})
    const sign = getZodiacSign({decimalDegrees: decimalDegrees, zodiac: this._zodiac})
    console.log(decimalDegrees, sign)
    return new ZodiacPosition({decimalDegrees: decimalDegrees, sign: sign})
  }

  get Ascendant() {
    const decimalDegrees = getAscendant({latitude: this.origin.latitude, localSiderealTime: this.origin.localSiderealTime})
    const sign = getZodiacSign({decimalDegrees: decimalDegrees, zodiac: this._zodiac})
    return new ZodiacPosition({decimalDegrees: decimalDegrees, sign: sign})
  }

  get SunSign() {
    return this.getSunSign(this._zodiac)
  }

  get HouseCusps() {
    return this.calculateHouseCusps(this._houseSystem)
  }

  calculateHouseCusps(string) {
    let cuspsArray
    switch (string) {
      case 'equal house':
        cuspsArray = calculateEqualHouseCusps({ascendant: this.Ascendant.DecimalDegrees, startingDegree: Sign.ZodiacStartOffset(this._zodiac)})
        break
      case 'koch':
        cuspsArray = calculateKochHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.Midheaven.DecimalDegrees, ascendant: this.Ascendant.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'placidus':
        cuspsArray = calculatePlacidianHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.Midheaven.DecimalDegrees, ascendant: this.Ascendant.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'regiomontanus':
        cuspsArray = calculateRegiomontanusHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.Midheaven.DecimalDegrees, ascendant: this.Ascendant.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'topocentric':
        cuspsArray = calculateTopocentricHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.Midheaven.DecimalDegrees, ascendant: this.Ascendant.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'whole sign':
        cuspsArray = calculateWholeSignHouseCusps({ascendant: this.Ascendant.DecimalDegrees, startingDegree: Sign.ZodiacStartOffset(this._zodiac)})
        break
      default:
        cuspsArray = calculatePlacidianHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.Midheaven.DecimalDegrees, ascendant: this.Ascendant.DecimalDegrees, latitude: this.origin.latitude})
        break
    }

    console.log(cuspsArray)
    return cuspsArray.map(cusp => new ZodiacPosition({decimalDegrees: cusp, sign: getZodiacSign({decimalDegrees: cusp, zodiac: this._zodiac})}))
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
    const standardizedDate = moment.tz({month: this.origin.utcTime.month(), date: this.origin.utcTime.date(), hour: this.origin.utcTime.hour(), minute: this.origin.utcTime.minute()}, 'UTC')
    const sign = Sign.Tropical.find(sign => {
      return standardizedDate.isBetween(sign.StartDate, sign.EndDate, null, '[]')
    })
    return sign
  }

  getSiderealSign() {
    const standardizedDate = moment.tz({month: this.origin.utcTime.month(), date: this.origin.utcTime.date(), hour: this.origin.utcTime.hour(), minute: this.origin.utcTime.minute()}, 'UTC')
    const sign = Sign.Sidereal.find(sign => {
      return standardizedDate.isBetween(sign.StartDate, sign.EndDate, null, '[]')
    })

    return sign
  }

  getAstronomicalSign() {
    const standardizedDate = moment.tz({month: this.origin.utcTime.month(), date: this.origin.utcTime.date(), hour: this.origin.utcTime.hour(), minute: this.origin.utcTime.minute()}, 'UTC')
    const sign = Sign.Astronomical.find(sign => {
      return standardizedDate.isBetween(sign.StartDate, sign.EndDate, null, '[]')
    })

    return sign
  }

  get ZodiacCusps() {
    return this.calculateZodiacCusps()
  }

  calculateZodiacCusps() {
    return new Array(12).fill(undefined).map((c, index) => {
      const zodiacOffset = Sign.ZodiacStartOffset(this._zodiac)
      return parseFloat(modulo((this.Ascendant.DecimalDegrees - zodiacOffset) - (index * 30), 360).toFixed(4))
    })
  }
}

export default Horoscope
