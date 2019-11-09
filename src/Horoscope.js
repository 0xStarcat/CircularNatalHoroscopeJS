import Sign from './Sign'
import ZodiacPosition from './ZodiacPosition'
import ChartPosition from './ChartPosition'
import House from './House'

import { getMidheavenSun, getAscendant } from './utilities/astronomy'
import Ephemeris from '../lib/ephemeris-1.2.1.bundle.js'
import { modulo } from './utilities/math'
import { calculateEqualHouseCusps, calculateKochHouseCusps, calculatePlacidianHouseCusps, calculateRegiomontanusHouseCusps, calculateTopocentricHouseCusps, calculateWholeSignHouseCusps, getZodiacSign, applyZodiacOffsetClockwise, applyZodiacOffsetCounter, zodiacPositionToEcliptic } from './utilities/astrology'
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
    return ['sidereal', 'tropical'] // not ready to implement 'astronomical'
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
    const decimalDegrees = applyZodiacOffsetCounter(getAscendant({latitude: this.origin.latitude, localSiderealTime: this.origin.localSiderealTime }), this._zodiac)

    return {
      ...new ZodiacPosition({decimalDegrees: decimalDegrees, zodiac: this._zodiac}),
      ...new ChartPosition({zodiacDegrees: decimalDegrees, eclipticDegrees: zodiacPositionToEcliptic(decimalDegrees, decimalDegrees) })
    }
  }

  createMidheaven() {
    const decimalDegrees = applyZodiacOffsetCounter(getMidheavenSun({localSiderealTime: this.origin.localSiderealTime }), this._zodiac)

    return {
      ...new ZodiacPosition({decimalDegrees: decimalDegrees, zodiac: this._zodiac}),
      ...new ChartPosition({zodiacDegrees: decimalDegrees, eclipticDegrees: zodiacPositionToEcliptic(this.Ascendant.Zodiac.DecimalDegrees, decimalDegrees) })
    }
  }

  createSunSign(zodiac) {
    // Source: https://horoscopes.lovetoknow.com/about-astrology/new-horoscope-dates
    // Astronomical dates from IAU and slightly altered to be computed without times.
    // Pending a better solution, all astronimical zodiac end dates are offset by -1

    const sign = Sign.OfType(zodiac).find(sign => {
      if (!sign.StartDate) return
      const originYear = this.origin.year
      const startDate = sign.StartDate.add(originYear, 'year')
      const endDate = sign.EndDate.add(originYear, 'year')
      return this.origin.utcTime.isBetween(startDate, endDate, null, '[]')
    })

    return sign
  }

  createZodiacCusps() {
    // Ascendant is a # in degrees longitude along the zodiac
    // Ascendant is always 0 on the ecliptic
    // A sign's ecliptic position is therefore the ascendant's degrees minus the sign's starting zodiac position (with offset applied for sidereal).
    return Sign.OfType(this._zodiac).map(sign => {
      const zodiacStart = sign.ZodiacStart
      const eclipticDegrees = zodiacPositionToEcliptic(this.Ascendant.Zodiac.DecimalDegrees, zodiacStart)

      return new ChartPosition({eclipticDegrees: eclipticDegrees, zodiacDegrees: zodiacStart})
    })
  }


  createHouseCusps(string) {
    let cuspsArray

    switch (string) {
      case 'equal house':
        cuspsArray = calculateEqualHouseCusps({ascendant: this.Ascendant.Zodiac.DecimalDegrees, zodiac: this._zodiac})
        break
      case 'koch':
        cuspsArray = calculateKochHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.Zodiac.DecimalDegrees, ascendant: this.Ascendant.Zodiac.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'placidus':
        cuspsArray = calculatePlacidianHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.Zodiac.DecimalDegrees, ascendant: this.Ascendant.Zodiac.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'regiomontanus':
        cuspsArray = calculateRegiomontanusHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.Zodiac.DecimalDegrees, ascendant: this.Ascendant.Zodiac.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'topocentric':
        cuspsArray = calculateTopocentricHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.Zodiac.DecimalDegrees, ascendant: this.Ascendant.Zodiac.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'whole sign':
        cuspsArray = calculateWholeSignHouseCusps({ascendant: this.Ascendant.Zodiac.DecimalDegrees, zodiac: this._zodiac})
        break
      default:
        cuspsArray = calculatePlacidianHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.Zodiac.DecimalDegrees, ascendant: this.Ascendant.Zodiac.DecimalDegrees, latitude: this.origin.latitude})
        break
    }

    return cuspsArray.map((cuspDegree, index) => {
      const name = `${index}`
      return new House({ascendantDegrees: this.Ascendant.Zodiac.DecimalDegrees, zodiacDegreesStart: cuspDegree, zodiacDegreesEnd: modulo(cuspsArray[index + 1], cuspsArray.length), name: name})
    })
  }

  processEphemerisResults(ephemerisResults) {
    const processedResults = ephemerisResults.map(result => {
      const zodiacDegrees = applyZodiacOffsetCounter(result.position.apparentLongitude, this._zodiac)
      return ({
        key: result.key,
        ...new ZodiacPosition({decimalDegrees: parseFloat(result.position.apparentLongitude), zodiac: this._zodiac}),
        ...new ChartPosition({
          eclipticDegrees: zodiacPositionToEcliptic(this.Ascendant.Zodiac.DecimalDegrees, zodiacDegrees),
          zodiacDegrees: zodiacDegrees
        }),
        isRetrograde: result.motion.isRetrograde
      })
    })

    return [...processedResults]
  }
}

export default Horoscope
