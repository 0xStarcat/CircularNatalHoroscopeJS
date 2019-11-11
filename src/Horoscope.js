import moment from 'moment-timezone'
import Ephemeris from '../lib/ephemeris-1.2.1.bundle.js'
import Sign from './Sign'
import ZodiacPosition from './ZodiacPosition'
import ChartPosition from './ChartPosition'
import House from './House'

import { LANGUAGE } from './utilities/language'
import { SIGNS, ASPECTS, BODIES, ANGLES, POINTS } from './constants'

import { getMidheavenSun, getAscendant } from './utilities/astronomy'
import { modulo, isDegreeWithinCircleArc } from './utilities/math'
import { createAspects } from './utilities/aspects'
import { validateHouseSystem, validateZodiac, validateAspectTypes, validateAspectPoints, validateCustomOrbs } from './utilities/validators'

import { calculateEqualHouseCusps, calculateKochHouseCusps, calculatePlacidianHouseCusps, calculateRegiomontanusHouseCusps, calculateTopocentricHouseCusps, calculateWholeSignHouseCusps, getZodiacSign, applyZodiacOffsetClockwise, applyZodiacOffsetCounter, zodiacPositionToEcliptic, getHouseFromDD, constructHouses } from './utilities/astrology'

//////////
// Horoscope
//////////
// This class contains horoscope chart calculations
/////////
// * Origin origin: instance of the Origin class
// * string houseSystem: a string from the list assigned to Horoscope.HouseSystems in the constructor.

class Horoscope {
  constructor({
    origin = null,
    language = 'en',
    houseSystem ='placidus',
    zodiac ='tropical',
    aspectPoints = ['bodies', 'points', 'angles'],
    aspectWithPoints = ['bodies', 'points', 'angles'],
    aspectTypes = ['major'],
    customOrbs = {}
  }={}) {
    this.origin = origin
    this._language = language
    this._houseSystem = validateHouseSystem(houseSystem, this._language)
    this._zodiac = validateZodiac(zodiac.toLowerCase(), this._language)
    this._ascendant = this.createAscendant()
    this._midheaven = this.createMidheaven()
    this._sunSign = this.createSunSign(this._zodiac)
    this._houses = this.createHouses(this._houseSystem)
    this._zodiacCusps = this.createZodiacCusps()
    this._aspectTypes = validateAspectTypes(aspectTypes)
    this._aspectPoints = validateAspectPoints(aspectPoints)
    this._aspectWithPoints = validateAspectPoints(aspectWithPoints)
    this._customOrbs = validateCustomOrbs(customOrbs)

    this.Ephemeris = new Ephemeris({
      year: this.origin.year, month: this.origin.month, day: this.origin.date,
      hours: this.origin.hour, minutes: this.origin.minute, seconds: this.origin.second,
      latitude: parseFloat(this.origin.latitude), longitude: parseFloat(this.origin.longitude),
      calculateShadows: false
    })

    this._celestialBodies = this.processCelestialBodies(this.Ephemeris.Results)
    this._celestialPoints = this.processCelestialPoints(this.Ephemeris.Results)

    this._aspects = createAspects(this)

    this.createAscendant = this.createAscendant.bind(this)
    this.createMidheaven = this.createMidheaven.bind(this)
    this.createSunSign = this.createSunSign.bind(this)
    this.createZodiacCusps = this.createZodiacCusps.bind(this)
    this.createHouses = this.createHouses.bind(this)
    this.processCelestialBodies = this.processCelestialBodies.bind(this)
    this.processCelestialPoints = this.processCelestialPoints.bind(this)
  }

  static HouseSystems(language="en") {
    return [
      {value: 'equal-house', label: LANGUAGE[language]['equal-house']},
      {value: 'koch', label: LANGUAGE[language]['koch']},
      {value: 'placidus', label: LANGUAGE[language]['placidus']},
      {value: 'regiomontanus', label: LANGUAGE[language]['regiomontanus']},
      {value: 'topocentric', label: LANGUAGE[language]['topocentric']},
      {value: 'whole-sign', label: LANGUAGE[language]['whole-sign']},
    ]
  }

  static HouseLabels(language="en") {
    return [...Array(12)].map((u, i) => i + 1).map(id => {
      return ({
        key: id,
        label: LANGUAGE[language][House.convertIdToKey(id)]
      })
    }
    )
  }

  static ZodiacSystems(language='en') {
    return [{value: 'sidereal', label: LANGUAGE[language]['sidereal-zodiac']}, {value: 'tropical', label: LANGUAGE[language]['tropical-zodiac']}] // not ready to implement 'astronomical'
  }

  static ZodiacLabels(language="en") {
    return ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].map(key => {
      return ({
        key,
        label: LANGUAGE[language][key]
      })
    }
    )
  }

  static CelestialLabels(language="en") {
    const labels = []
    Object.keys(BODIES).forEach(bodyKey => {
      labels.push({
        key: bodyKey,
        label: LANGUAGE[language][bodyKey],
        type: 'body'
      })
    })

    Object.keys(POINTS).forEach(pointKey => {
      labels.push({
        key: pointKey,
        label: LANGUAGE[language][pointKey],
        type: 'point'
      })
    })

    Object.keys(ANGLES).forEach(angleKey => {
      labels.push({
        key: angleKey,
        label: LANGUAGE[language][angleKey],
        type: 'angle'
      })
    })

    return labels
  }

  static Languages(language='en') {
    return [
      { key: 'english-language', value: 'en', label: LANGUAGE[language]['english-language'] },
      { key: 'spanish-language', value: 'es', label: LANGUAGE[language]['spanish-language'] }
    ]
  }

  static AspectLabels(language='en') {
    return Object.keys(ASPECTS).map(aspectKey => {
      return ({
        key: aspectKey,
        label: LANGUAGE[language][aspectKey],
        defaultOrb: ASPECTS[aspectKey].defaultOrb,
        angle: ASPECTS[aspectKey].angle,
        level: ASPECTS[aspectKey].level,
        levelLabel: LANGUAGE[language][ASPECTS[aspectKey].level]
      })
    })
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

  get Houses() {
    return this._houses
  }

  get ZodiacCusps() {
    return this._zodiacCusps
  }

  get Angles() {
    const angles = [this.Ascendant, this.Midheaven]
    return {
      all: angles,
      ...Object.assign({}, ...angles.map(angle => ({[angle.key]: angle})))
    }
  }

  get CelestialBodies() {
    return this._celestialBodies
  }

  get CelestialPoints() {
    return this._celestialPoints
  }

  get Aspects() {
    return this._aspects
  }

  createAscendant() {
    const decimalDegrees = applyZodiacOffsetCounter(getAscendant({latitude: this.origin.latitude, localSiderealTime: this.origin.localSiderealTime }), this._zodiac)

    const key = 'ascendant'
    return {
      key: key,
      label: LANGUAGE[this._language][key],
      ...new ZodiacPosition({decimalDegrees: decimalDegrees, zodiac: this._zodiac}),
      ChartPosition: new ChartPosition({zodiacDegrees: decimalDegrees, eclipticDegrees: zodiacPositionToEcliptic(decimalDegrees, decimalDegrees) })
    }
  }

  createMidheaven() {
    const decimalDegrees = applyZodiacOffsetCounter(getMidheavenSun({localSiderealTime: this.origin.localSiderealTime }), this._zodiac)

    const key = 'midheaven'
    return {
      key: key,
      label: LANGUAGE[this._language][key],
      ...new ZodiacPosition({decimalDegrees: decimalDegrees, zodiac: this._zodiac}),
      ChartPosition: new ChartPosition({zodiacDegrees: decimalDegrees, eclipticDegrees: zodiacPositionToEcliptic(this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, decimalDegrees) })
    }
  }

  createSunSign(zodiac) {
    // Source: https://horoscopes.lovetoknow.com/about-astrology/new-horoscope-dates
    const sign = Sign.OfType(zodiac).find(sign => {
      if (!sign.StartDate) return
      const originYear = this.origin.year
      const startDate = moment(sign.StartDate).add(originYear, 'year')
      const endDate = moment(sign.EndDate).add(originYear, 'year')

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
      const eclipticDegrees = zodiacPositionToEcliptic(this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, zodiacStart)

      return {
        ChartPosition: new ChartPosition({eclipticDegrees: eclipticDegrees, zodiacDegrees: zodiacStart}),
        Sign: getZodiacSign({decimalDegrees: applyZodiacOffsetCounter(zodiacStart, this._zodiac), zodiac: this._zodiac})
      }
    })
  }


  createHouses(string) {
    let cuspsArray

    switch (string) {
      case 'equal-house':
        cuspsArray = calculateEqualHouseCusps({ascendant: this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, zodiac: this._zodiac})
        break
      case 'koch':
        cuspsArray = calculateKochHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.ChartPosition.Ecliptic.DecimalDegrees, ascendant: this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'placidus':
        cuspsArray = calculatePlacidianHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.ChartPosition.Ecliptic.DecimalDegrees, ascendant: this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'regiomontanus':
        cuspsArray = calculateRegiomontanusHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.ChartPosition.Ecliptic.DecimalDegrees, ascendant: this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'topocentric':
        cuspsArray = calculateTopocentricHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.ChartPosition.Ecliptic.DecimalDegrees, ascendant: this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, latitude: this.origin.latitude})
        break
      case 'whole-sign':
        cuspsArray = calculateWholeSignHouseCusps({ascendant: this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, zodiac: this._zodiac})
        break
      default:
        cuspsArray = calculatePlacidianHouseCusps({rightAscensionMC: applyZodiacOffsetCounter(this.origin.localSiderealTime, this._zodiac), midheaven: this.Midheaven.ChartPosition.Ecliptic.DecimalDegrees, ascendant: this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, latitude: this.origin.latitude})
        break
    }

    return constructHouses(cuspsArray, this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, this._zodiac)

  }

  processCelestialBodies(ephemerisResults) {
    const processedResults = ephemerisResults.map(result => {
      const zodiacDegrees = applyZodiacOffsetCounter(result.position.apparentLongitude, this._zodiac)

      return ({
        key: result.key,
        label: LANGUAGE[this._language][result.key],
        Sign: getZodiacSign({decimalDegrees: zodiacDegrees, zodiac: this._zodiac}),
        ChartPosition: new ChartPosition({
          eclipticDegrees: zodiacPositionToEcliptic(this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, zodiacDegrees),
          zodiacDegrees: zodiacDegrees
        }),
        House: getHouseFromDD(this.Houses, zodiacDegrees),
        isRetrograde: result.motion.isRetrograde
      })
    })

    return {
      all: processedResults,
      ...Object.assign({}, ...processedResults.map(result => ({[result.key]: result})))
    }
  }

  processCelestialPoints(ephemerisResults) {
    const keys = Object.keys(POINTS)

    const points = keys.map(key => {
      let zodiacDegrees
      switch(key) {
        case 'northnode':
          zodiacDegrees = ephemerisResults.find(body => body.key === 'moon').orbit.meanAscendingNode.apparentLongitude
          break
        case 'southnode':
          zodiacDegrees = ephemerisResults.find(body => body.key === 'moon').orbit.meanDescendingNode.apparentLongitude
          break
        case 'lilith':
          zodiacDegrees = ephemerisResults.find(body => body.key === 'moon').orbit.meanApogee.apparentLongitude
          break
      }

      zodiacDegrees = applyZodiacOffsetCounter(zodiacDegrees, this._zodiac)

      return {
        key,
        label: LANGUAGE[this._language][key],
        ChartPosition: new ChartPosition({zodiacDegrees, eclipticDegrees: zodiacPositionToEcliptic(this.Ascendant.ChartPosition.Ecliptic.DecimalDegrees, zodiacDegrees) }),
        Sign: getZodiacSign({decimalDegrees: zodiacDegrees, zodiac: this._zodiac}),
        House: getHouseFromDD(this.Houses, zodiacDegrees),
      }
    })

    return {
      all: points,
      ...Object.assign({}, ...points.map(point => ({[point.key]: point})))
    }
  }

}

export default Horoscope
