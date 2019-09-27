import { getMidheavenSun, getAscendent } from './utilities/astronomy'

//////////
// Horoscope
//////////
// This class contains horoscope chart calculations
/////////
// * Origin origin: instance of the Origin class
// * string houseSystem: a string from the list assigned to this.houseSystems in the constructor.

class Horoscope {
  constructor({origin = null, houseSystem='placidus'}={}) {
    this.houseSystems = ['placidus']
    this.midheaven = getMidheavenSun({localSiderealTime: origin.localSiderealTime})
    this.ascendent = getAscendent({latitude: origin.latitude, localSiderealTime: origin.localSiderealTime})
    this.houseSystem = this.validateHouseSystem(houseSystem)

    this.validateHouseSystem = this.validateHouseSystem.bind(this)
  }

  validateHouseSystem(string) {
    if (this.houseSystems.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" house system is not included. Please choose from the following list: ${this.houseSystems.join(', ')}.`)
  }
}

export default Horoscope
