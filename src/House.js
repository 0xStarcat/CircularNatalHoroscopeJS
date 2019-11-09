import { zodiacPositionToEcliptic, getZodiacSign, applyZodiacOffsetCounter } from './utilities/astrology'
import { modulo } from './utilities/math'
import ChartPosition from './ChartPosition'

export default class House {
  constructor({ascendantDegrees=0, zodiacDegreesStart=0, zodiacDegreesEnd=0, id=0, zodiac}={}) {
    this.Id = id
    this.Name = this.getHouseName(id)

    zodiacDegreesStart = parseFloat(modulo(zodiacDegreesStart, 360).toFixed(4))
    zodiacDegreesEnd = parseFloat(modulo(zodiacDegreesEnd, 360).toFixed(4))

    const eclipticDegreesStart = zodiacPositionToEcliptic(ascendantDegrees, zodiacDegreesStart)
    const eclipticDegreesEnd = zodiacPositionToEcliptic(ascendantDegrees, zodiacDegreesEnd)

    this.StartPosition = new ChartPosition({eclipticDegrees: eclipticDegreesStart, zodiacDegrees: zodiacDegreesStart})

    this.EndPosition = new ChartPosition({eclipticDegrees: eclipticDegreesEnd, zodiacDegrees: zodiacDegreesEnd})

    this.Sign = getZodiacSign({decimalDegrees: applyZodiacOffsetCounter(zodiacDegreesStart, zodiac), zodiac: zodiac})
  }

  getHouseName(id) {
    let name = ''
    switch(id) {
      case 1:
        name = 'First'
        break
      case 2:
        name = 'Second'
        break
      case 3:
        name = 'Third'
        break
      case 4:
        name = 'Fourth'
        break
      case 5:
        name = 'Fifth'
        break
      case 6:
        name = 'Sixth'
        break
      case 7:
        name = 'Seventh'
        break
      case 8:
        name = 'Eighth'
        break
      case 9:
        name = 'Ninth'
        break
      case 10:
        name = 'Tenth'
        break
      case 11:
        name = 'Eleventh'
        break
      case 12:
        name = 'Twelth'
        break
    }

    return name
  }
}
