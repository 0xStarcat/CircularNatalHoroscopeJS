import { getMidheavenSun, getascendant } from './utilities/astronomy'

import { calculateEqualHouseCusps, calculateKochHouseCusps, calculatePlacidianHouseCusps, calculateRegiomontanusHouseCusps, calculateTopocentricHouseCusps, calculateWholeSignHouseCusps } from './utilities/astrology'

//////////
// Horoscope
//////////
// This class contains horoscope chart calculations
/////////
// * Origin origin: instance of the Origin class
// * string houseSystem: a string from the list assigned to Horoscope.HouseSystems in the constructor.

class Horoscope {
  constructor({origin = null, houseSystem='placidus'}={}) {
    this.origin = origin
    this.midheaven = getMidheavenSun({localSiderealTime: origin.localSiderealTime})
    this.ascendant = getascendant({latitude: origin.latitude, localSiderealTime: origin.localSiderealTime})
    this.houseSystem = this.validateHouseSystem(houseSystem)
    this.houseCusps = this.calculateHouseCusps(this.houseSystem)
    this.validateHouseSystem = this.validateHouseSystem.bind(this)
  }

  static get HouseSystems() {
    return ['equal house', 'koch', 'placidus', 'regiomontanus', 'topocentric', 'whole sign']
  }

  validateHouseSystem(string) {
    if (Horoscope.HouseSystems.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" house system is not included. Please choose from the following list: ${Horoscope.HouseSystems.join(', ')}.`)
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
}

export default Horoscope
