import { getMidheavenSun, getAscendent } from './utilities/astronomy'

//////////
// Horoscope
//////////
// This class contains horoscope chart calculations
/////////
// * Origin origin: instance of the Origin class

class Horoscope {
  constructor({origin = null}={}) {
    this.midheaven = getMidheavenSun({localSiderealTime: origin.localSiderealTime})
    this.ascendent = getAscendent({latitude: origin.latitude, localSiderealTime: origin.localSiderealTime})
  }
}

export default Horoscope
