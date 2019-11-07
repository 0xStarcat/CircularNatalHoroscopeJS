import Sign from './Sign'
import ZodiacPosition from './ZodiacPosition'
import { getMidheavenSun, getAscendant } from './utilities/astronomy'
import Ephemeris from '../lib/ephemeris-1.2.1.bundle.js'
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
    this._ascendant = this.createAscendant()
    this._midheaven = this.createMidheaven()
    this._sunSign = this.createSunSign(this._zodiac)
    this._houseCusps = this.createHouseCusps(this._houseSystem)
    this._zodiacCusps = this.createZodiacCusps()
    this.Ephemeris = new Ephemeris({
      year: this.origin.year, month: this.origin.month, day: this.origin.date,
      hours: this.origin.hour, minutes: this.origin.minute, seconds: this.origin.second,
      latitude: parseFloat(this.origin.latitude), longitude: parseFloat(this.origin.longitude),
      calculateShadows: false
    })

    this._celestialBodies = this.processEphemerisResults(this.Ephemeris.Results)

    this.validateHouseSystem = this.validateHouseSystem.bind(this)
    this.validateZodiac = this.validateZodiac.bind(this)
    this.createAscendant = this.createAscendant.bind(this)
    this.createMidheaven = this.createMidheaven.bind(this)
    this.createSunSign = this.createSunSign.bind(this)
    this.createHouseCusps = this.createHouseCusps.bind(this)
    this.createZodiacCusps = this.createZodiacCusps.bind(this)
    this.processEphemerisResults = this.processEphemerisResults.bind(this)
  }

  static get HouseSystems() {
    return ['equal house', 'koch', 'placidus', 'regiomontanus', 'topocentric', 'whole sign']
  }


  static get ZodiacSystems() {
    return ['astronomical', 'sidereal', 'tropical']
  }

  get Ascendant() {
    return this._ascendant
  }

  get Midheaven() {
    return this._midheaven
  }

  get SunSign() {
    return this._sunSign
  }

  get HouseCusps() {
    return this._houseCusps
  }

  get ZodiacCusps() {
    return this._zodiacCusps
  }

  get CelestialBodies() {
    return this._celestialBodies
  }

  validateHouseSystem(string) {
    if (Horoscope.HouseSystems.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" house system is not included. Please choose from the following list: ${Horoscope.HouseSystems.join(', ')}.`)
  }

  validateZodiac(string) {
    if (Horoscope.ZodiacSystems.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" zodiac is not included. Please choose from the following list: ${Horoscope.ZodiacSystems.join(', ')}.`)
  }

  createAscendant() {
    const decimalDegrees = getAscendant({latitude: this.origin.latitude, localSiderealTime: this.origin.localSiderealTime, zodiacOffset: Sign.ZodiacStartOffset(this._zodiac)})
    const sign = getZodiacSign({decimalDegrees: decimalDegrees, zodiac: this._zodiac})

    return new ZodiacPosition({decimalDegrees: decimalDegrees, sign: sign})
  }

  createMidheaven() {
    const decimalDegrees = getMidheavenSun({localSiderealTime: this.origin.localSiderealTime, zodiacOffset: Sign.ZodiacStartOffset(this._zodiac)})
    const sign = getZodiacSign({decimalDegrees: decimalDegrees, zodiac: this._zodiac})

    return new ZodiacPosition({decimalDegrees: decimalDegrees, sign: sign})
  }

  createSunSign(zodiac) {
    // Source: https://horoscopes.lovetoknow.com/about-astrology/new-horoscope-dates
    // Astronomical dates from IAU and slightly altered to be computed without times.
    // Pending a better solution, all astronimical zodiac end dates are offset by -1

    const standardizedDate = moment.tz({month: this.origin.utcTime.month(), date: this.origin.utcTime.date(), hour: this.origin.utcTime.hour(), minute: this.origin.utcTime.minute()}, 'UTC')
    const sign = Sign.OfType(zodiac).find(sign => {
      return standardizedDate.isBetween(sign.StartDate, sign.EndDate, null, '[]')
    })
    return sign
  }

  createHouseCusps(string) {
    let cuspsArray
    switch (string) {
      case 'equal house':
        cuspsArray = calculateEqualHouseCusps({ascendant: this.Ascendant.DecimalDegrees})
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
        cuspsArray = calculateWholeSignHouseCusps({ascendant: this.Ascendant.DecimalDegrees})
        break
      default:
        cuspsArray = calculatePlacidianHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.Midheaven.DecimalDegrees, ascendant: this.Ascendant.DecimalDegrees, latitude: this.origin.latitude})
        break
    }

    return cuspsArray.map(cusp => new ZodiacPosition({decimalDegrees: cusp, sign: getZodiacSign({decimalDegrees: cusp, zodiac: this._zodiac})}))
  }

  createZodiacCusps() {
    return new Array(12).fill(undefined).map((c, index) => {
      return parseFloat(modulo(this.Ascendant.DecimalDegrees - (index * 30), 360).toFixed(4))
    })
  }

  processEphemerisResults(ephemerisResults) {
    const processedResults = ephemerisResults.map(result => {
      return ({
        key: result.key,
        ...new ZodiacPosition({decimalDegrees: result.position.apparentLongitude, sign: getZodiacSign({decimalDegrees: result.position.apparentLongitude, zodiac: this._zodiac})}),
        isRetrograde: result.motion.isRetrograde
      })
    })


    console.log(processedResults)
    return [...processedResults]
  }
}

export default Horoscope
