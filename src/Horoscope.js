import { getMidheavenSun, getAscendent } from './utilities/astronomy'

import { calculatePlacidianHouseCusps } from './utilities/astrology'

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
    this.ascendent = getAscendent({latitude: origin.latitude, localSiderealTime: origin.localSiderealTime})
    this.houseSystem = this.validateHouseSystem(houseSystem)
    this.houseCusps = this.calculateHouseCusps(this.houseSystem)
    this.validateHouseSystem = this.validateHouseSystem.bind(this)
  }

  static get HouseSystems() {
    return ['placidus']
  }

  validateHouseSystem(string) {
    if (Horoscope.HouseSystems.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" house system is not included. Please choose from the following list: ${Horoscope.HouseSystems.join(', ')}.`)
  }

  calculateHouseCusps(string) {
    switch (string) {
      case 'placidus':
        return calculatePlacidianHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.midheaven, ascendent: this.ascendent, latitude: this.origin.latitude})
      default:
        return calculatePlacidianHouseCusps({rightAscensionMC: this.origin.localSiderealTime, midheaven: this.midheaven, ascendent: this.ascendent, latitude: this.origin.latitude})
    }
  }
}

export default Horoscope
