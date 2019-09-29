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
    this.zodiac = zodiac.toLowerCase()
    this.sign = this.getSign(this.zodiac)

    this.getSign = this.getSign.bind(this)
    this.getTropicalSign = this.getTropicalSign.bind(this)
    this.getConstellationSign = this.getConstellationSign.bind(this)
  }

  getSign(zodiac) {
    switch(zodiac) {
      case 'tropical':
        return this.getTropicalSign()
      case 'sidereal':
        return this.getSiderealSign()
      case 'constellation':
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
      return moment({month: sign.constellationStartMonth, date: sign.constellationStartDate}) <= this.moment && moment({month: sign.constellationEndMonth, date: sign.constellationEndDate}) >= this.moment
    })

    return sign
  }
}


export default SunSign
