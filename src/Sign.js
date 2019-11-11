import moment from 'moment-timezone'
import { modulo } from './utilities/math'
import { SIGNS } from './constants'
import { LANGUAGE } from './utilities/language'
import { validateZodiac } from './utilities/validators'

class Sign {
  constructor({key='', zodiac="tropical", language='en'}={}) {
    const signData = SIGNS.find(sign => sign.key === key)

    this.key = key
    this.zodiac = validateZodiac(zodiac.toLowerCase(), language)

    if (signData) {
      this.label = LANGUAGE[language][key]
      Object.keys(signData).forEach(key => {
        this[key] = signData[key]
      })
    }
  }

  static get Astronomical() {
    return SIGNS.map(sign => new Sign({key: sign.key, zodiac: 'astronomical'}))
  }

  static get Sidereal() {
    return SIGNS.filter(sign => sign.key !== 'ophiuchus').map(sign => new Sign({key: sign.key, zodiac: 'sidereal'})) // no Ophiucus
  }

  static get Tropical() {
    return SIGNS.filter(sign => sign.key !== 'ophiuchus').map(sign => new Sign({key: sign.key, zodiac: 'tropical'})) // no Ophiucus
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
