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

  static Astronomical(language) {
    return SIGNS.map(sign => new Sign({key: sign.key, zodiac: 'astronomical', language}))
  }

  static Sidereal(language) {
    return SIGNS.filter(sign => sign.key !== 'ophiuchus').map(sign => new Sign({key: sign.key, zodiac: 'sidereal', language})) // no Ophiucus
  }

  static Tropical(language) {
    return SIGNS.filter(sign => sign.key !== 'ophiuchus').map(sign => new Sign({key: sign.key, zodiac: 'tropical', language})) // no Ophiucus
  }

  static OfType(zodiac, language='en') {
    switch(zodiac) {
      case 'astronomical':
        return Sign.Astronomical(language)
      case 'sidereal':
        return Sign.Sidereal(language)
      case 'tropical':
        return Sign.Tropical(language)
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
