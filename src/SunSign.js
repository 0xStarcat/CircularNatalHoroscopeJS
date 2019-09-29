import moment from 'moment'
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
  }

  getSign(zodiac) {
    switch(zodiac) {
      case 'tropical':
        return this.getTropicalSign()
      case 'sidereal':
        return
      case 'constellation':
        return
    }
  }

  getTropicalSign() {
    // Each month integer is offset by -1
    const aries = {name: 'Aries', startMonth: 2, startDate: 21, endMonth: 3, endDate: 19}
    const taurus = {name: 'Taurus', startMonth: 3, startDate: 20, endMonth: 4, endDate: 20}
    const gemini = {name: 'Gemini', startMonth: 4, startDate: 21, endMonth: 5, endDate: 20}
    const cancer = {name: 'Cancer', startMonth: 5, startDate: 21, endMonth: 6, endDate: 22}
    const leo = {name: 'Leo', startMonth: 6, startDate: 23, endMonth: 7, endDate: 22}
    const virgo = {name: 'Virgo', startMonth: 7, startDate: 23, endMonth: 8, endDate: 22}
    const libra = {name: 'Libra', startMonth: 8, startDate: 23, endMonth: 9, endDate: 22}
    const scorpio = {name: 'Scorpio', startMonth: 9, startDate: 23, endMonth: 10, endDate: 21}
    const sagittarius = {name: 'Sagittarius', startMonth: 10, startDate: 22, endMonth: 11, endDate: 21}
    const capricorn = {name: 'Capricorn', startMonth: 11, startDate: 22, endMonth: 0, endDate: 19}
    const aquarius = {name: 'Aquarius', startMonth: 0, startDate: 20, endMonth: 1, endDate: 18}
    const pisces = {name: 'Pisces', startMonth: 1, startDate: 19, endMonth: 2, endDate: 20}

    const array = [ aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces ]

    const sign = array.find(sign => {
      return moment({month: sign.startMonth, date: sign.startDate}) <= this.moment && moment({month: sign.endMonth, date: sign.endDate}) >= this.moment
    })

    return sign
  }
}


export default SunSign
