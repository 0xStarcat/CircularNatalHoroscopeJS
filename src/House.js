import { zodiacPositionToEcliptic, getZodiacSign, applyZodiacOffsetCounter } from './utilities/astrology'
import { modulo } from './utilities/math'
import ChartPosition from './ChartPosition'
import { LANGUAGE } from './utilities/language'

export default class House {
  constructor({ascendantDegrees=0, zodiacDegreesStart=0, zodiacDegreesEnd=0, id=0, zodiac='tropical', language='en'}={}) {
    this._language = language
    zodiacDegreesStart = parseFloat(modulo(zodiacDegreesStart, 360).toFixed(4))
    zodiacDegreesEnd = parseFloat(modulo(zodiacDegreesEnd, 360).toFixed(4))

    this.id = id
    this.label = LANGUAGE[this._language][House.convertIdToKey(id)]

    const eclipticDegreesStart = zodiacPositionToEcliptic(ascendantDegrees, zodiacDegreesStart)
    const eclipticDegreesEnd = zodiacPositionToEcliptic(ascendantDegrees, zodiacDegreesEnd)

    this.ChartPosition = {
      StartPosition: new ChartPosition({eclipticDegrees: eclipticDegreesStart, zodiacDegrees: zodiacDegreesStart}),
      EndPosition: new ChartPosition({eclipticDegrees: eclipticDegreesEnd, zodiacDegrees: zodiacDegreesEnd})
    }

    this.Sign = getZodiacSign({decimalDegrees: zodiacDegreesStart, zodiac: zodiac})
  }

  static convertIdToKey(id) {
    let name = ''
    switch(id) {
      case 1:
        name = 'house1'
        break
      case 2:
        name = 'house2'
        break
      case 3:
        name = 'house3'
        break
      case 4:
        name = 'house4'
        break
      case 5:
        name = 'house5'
        break
      case 6:
        name = 'house6'
        break
      case 7:
        name = 'house7'
        break
      case 8:
        name = 'house8'
        break
      case 9:
        name = 'house9'
        break
      case 10:
        name = 'house10'
        break
      case 11:
        name = 'house11'
        break
      case 12:
        name = 'house12'
        break
    }

    return name
  }
}
