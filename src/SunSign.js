import moment from 'moment'
import { signs } from './utilities/signs'
import {
  validateMonth,
  validateDate,
} from './utilities/validators'

class SunSign {
  constructor({month=0, date=1, zodiac="tropical"}={}) {
    this.month = validateMonth(month)
    this.date = validateDate(date)
    this.moment = moment({month: this.month, date: this.date})
    this.zodiac = this.validateZodiac(zodiac.toLowerCase())
    this.sign = this.getSign(this.zodiac)

    this.getSign = this.getSign.bind(this)
    this.getTropicalSign = this.getTropicalSign.bind(this)
    this.getConstellationSign = this.getConstellationSign.bind(this)
    this.validateZodiac = this.validateZodiac.bind(this)
  }

  static get Zodiacs() {
    return ['astronomical', 'sidereal', 'tropical']
  }

  validateZodiac(string) {
    if (SunSign.Zodiacs.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" zodiac is not included. Please choose from the following list: ${SunSign.Zodiacs.join(', ')}.`)
  }

  getSign(zodiac) {
    // Source: https://horoscopes.lovetoknow.com/about-astrology/new-horoscope-dates
    // Constellation dates from IAU and slightly altered to be computed without times. End dates are all offset by -1
    //

    switch(zodiac) {
      case 'tropical':
        return this.getTropicalSign()
      case 'sidereal':
        return this.getSiderealSign()
      case 'astronomical':
        return this.getConstellationSign()
    }
  }

  getTropicalSign() {
    // Each month integer is offset by -1
    const sign = signs.find(sign => {
      return moment({month: sign.tropicalStartMonth, date: sign.tropicalStartDate}) <= this.moment && moment({month: sign.tropicalEndMonth, date: sign.tropicalEndDate}) >= this.moment
    })

    return sign
  }

  getSiderealSign() {
    // Each month integer is offset by -1
    const sign = signs.find(sign => {
      return moment({month: sign.siderealStartMonth, date: sign.siderealStartDate}) <= this.moment && moment({month: sign.siderealEndMonth, date: sign.siderealEndDate}) >= this.moment
    })

    return sign
  }

  getConstellationSign() {
    // Each month integer is offset by -1
    const sign = signs.find(sign => {
      return moment({month: sign.astronomicalStartMonth, date: sign.astronomicalStartDate}) <= this.moment && moment({month: sign.astronomicalEndMonth, date: sign.astronomicalEndDate}) >= this.moment
    })

    return sign
  }
}


export default SunSign
