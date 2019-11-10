import moment from 'moment-timezone'
import { modulo } from './utilities/math'
import { SIGNS } from './constants'

class Sign {
  constructor({id=0, zodiac="tropical"}={}) {
    const signData = SIGNS.find(sign => sign.id === id)

    this.id = id
    this.zodiac = this.validateZodiac(zodiac.toLowerCase())

    if (signData) {
      this.label = signData.name
      Object.keys(signData).forEach(key => {
        this[key] = signData[key]
      })
    }
  }

  // https://en.wikipedia.org/wiki/Zodiac#Table_of_dates
  // https://www.inaoep.mx/~frosales/html/zodiac/index.html
  static get Data() {
    return []
  }

  static get Astronomical() {
    return SIGNS.map(sign => new Sign({id: sign.id, zodiac: 'astronomical'}))
  }

  static get Sidereal() {
    return SIGNS.filter(sign => sign.id !== 12).map(sign => new Sign({id: sign.id, zodiac: 'sidereal'})) // no Ophiucus
  }

  static get Tropical() {
    return SIGNS.filter(sign => sign.id !== 12).map(sign => new Sign({id: sign.id, zodiac: 'tropical'})) // no Ophiucus
  }

  static OfType(zodiac) {
    switch(zodiac) {
      case 'astronomical':
        return Sign.Astronomical
      case 'sidereal':
        return Sign.Sidereal
      case 'tropical':
        return Sign.Tropical
    }
  }

  static get ZodiacSystems() {
    return ['astronomical', 'sidereal', 'tropical']
  }

  validateZodiac(string) {
    if (Sign.ZodiacSystems.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" zodiac is not included. Please choose from the following list: ${Sign.ZodiacSystems.join(', ')}.`)
  }

  get StartDate() {
    return this.startDate[this.zodiac]
  }

  get EndDate() {
    return this.endDate[this.zodiac]
  }

  get ZodiacStart() {
    return parseFloat(modulo(this.zodiacStart, 360).toFixed(4))
  }

  get ZodiacEnd() {
    return parseFloat(modulo(this.zodiacEnd, 360).toFixed(4))
  }
}

export default Sign
