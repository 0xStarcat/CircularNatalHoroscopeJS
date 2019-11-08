import moment from 'moment-timezone'
import { modulo } from './utilities/math'

class Sign {
  constructor({id=0, zodiac="tropical"}={}) {
    this.id = id
    this.zodiac = this.validateZodiac(zodiac.toLowerCase())

  }

  // https://en.wikipedia.org/wiki/Zodiac#Table_of_dates
  // https://www.inaoep.mx/~frosales/html/zodiac/index.html
  static get Data() {
    return [{
        id: 0,
        name: 'Aries',
        startDate: {
          tropical: moment.utc([0, 2, 21, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 3, 15, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 3, 19, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 3, 20, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 4, 15, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 4, 14, 0, 0, 0]).endOf('day')
        },
        zodiacStart: 0,
        zodiacEnd: 30
      },
      {
        id: 1,
        name: 'Taurus',
        startDate: {
          tropical: moment.utc([0, 3, 21, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 4, 16, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 4, 15, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 4, 20, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 5, 15, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 5, 21, 0, 0, 0]).endOf('day'),
        },
        zodiacStart: 30,
        zodiacEnd: 60
      },
      {
        id: 2,
        name: 'Gemini',
        startDate: {
          tropical: moment.utc([0, 4, 21, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 5, 16, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 5, 22, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 5, 21, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 6, 16, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 6, 20, 0, 0, 0]).endOf('day')
        },
        zodiacStart: 60,
        zodiacEnd: 90
      },
      {
        id: 3,
        name: 'Cancer',
        startDate: {
          tropical: moment.utc([0, 5, 22, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 6, 17, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 6, 21, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 6, 22, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 7, 16, 0, 0, 0]).endOf('day'),
          astronomical:  moment.utc([0, 7, 10, 0, 0, 0]).endOf('day')
        },
        zodiacStart: 90,
        zodiacEnd: 120
      },
      {
        id: 4,
        name: 'Leo',
        startDate: {
          tropical: moment.utc([0, 6, 23, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 7, 17, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 7, 11, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 7, 23, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 8, 16, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 9, 16, 0, 0, 0]).endOf('day')
        },
        zodiacStart: 120,
        zodiacEnd: 150
      },
      {
        id: 5,
        name: 'Virgo',
        startDate: {
          tropical: moment.utc([0, 7, 24, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 8, 17, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 8, 17, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 8, 22, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 9, 17, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 9, 31, 0, 0, 0]).endOf('day')
        },
        zodiacStart: 150,
        zodiacEnd: 180
      },
      {
        id: 6,
        name: 'Libra',
        startDate: {
          tropical: moment.utc([0, 8, 23, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 9, 18, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 10, 1, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 9, 23, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 10, 16, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 10, 23, 0, 0, 0]).endOf('day')
        },
        zodiacStart: 180,
        zodiacEnd: 210
      },
      {
        id: 7,
        name: 'Scorpio',
        startDate: {
          tropical: moment.utc([0, 9, 24, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 10, 17, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 10, 23, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 10, 22, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 11, 16, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 11, 30, 0, 0, 0]).endOf('day')
        },
        zodiacStart: 210,
        zodiacEnd: 240
      },
      {
        id: 12,
        name: 'Ophiuchus',
        startDate: {
          astronomical: moment.utc([0, 11, 1, 0, 0, 0]).startOf('day')
        },
        endDate: {
          astronomical: moment.utc([0, 11, 18, 0, 0, 0]).endOf('day')
        },
        zodiacStart: -1,
        zodiacEnd: -1
      },
      {
        id: 8,
        startDate: {
          tropical: moment.utc([0, 10, 23, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 11, 17, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 11, 19, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 11, 22, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([1, 0, 15, 0, 0, 0]).endOf('day'), // add 1 year due to overlap
          astronomical: moment.utc([1, 0, 19, 0, 0, 0]).endOf('day') // add 1 year due to overlap
        },
        name: 'Sagittarius',
        zodiacStart: 240,
        zodiacEnd: 270
      },
      {
        id: 9,
        startDate: {
          tropical: moment.utc([0, 11, 23, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 0, 16, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 0, 20, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([1, 0, 20, 0, 0, 0]).endOf('day'), // add 1 year due to overlap
          sidereal:  moment.utc([0, 1, 14, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 1, 16, 0, 0, 0]).endOf('day')
        },
        name: 'Capricorn',
        zodiacStart: 270,
        zodiacEnd: 300
      },
      {
        id: 10,
        startDate: {
          tropical: moment.utc([0, 0, 21, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 1, 15, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 1, 17, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 1, 18, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 2, 15, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 2, 11, 0, 0, 0]).endOf('day')
        },
        name: 'Aquarius',
        zodiacStart: 300,
        zodiacEnd: 330
      },
      {
        id: 11,
        startDate: {
          tropical: moment.utc([0, 1, 19, 0, 0, 0]).startOf('day'),
          sidereal: moment.utc([0, 2, 16, 0, 0, 0]).startOf('day'),
          astronomical: moment.utc([0, 2, 12, 0, 0, 0]).startOf('day')
        },
        endDate: {
          tropical: moment.utc([0, 2, 20, 0, 0, 0]).endOf('day'),
          sidereal: moment.utc([0, 3, 14, 0, 0, 0]).endOf('day'),
          astronomical: moment.utc([0, 3, 18, 0, 0, 0]).endOf('day')
        },
        name: 'Pisces',
        zodiacStart: 330,
        zodiacEnd: 0
      }]
  }

  static get Astronomical() {
    return Sign.Data.map(sign => new Sign({id: sign.id, zodiac: 'astronomical'}))
  }

  static get Sidereal() {
    return Sign.Data.filter(sign => sign.id !== 12).map(sign => new Sign({id: sign.id, zodiac: 'sidereal'})) // no Ophiucus
  }

  static get Tropical() {
    return Sign.Data.filter(sign => sign.id !== 12).map(sign => new Sign({id: sign.id, zodiac: 'tropical'})) // no Ophiucus
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

  get Name() {
    return Sign.Data.find(sign => sign.id === this.id).name
  }

  get StartDate() {
    const sign = Sign.Data.find(sign => sign.id === this.id)
    return sign.startDate[this.zodiac]
  }

  get EndDate() {
    const sign = Sign.Data.find(sign => sign.id === this.id)
    return sign.endDate[this.zodiac]
  }

  get ZodiacStart() {
    const sign = Sign.Data.find(sign => sign.id === this.id)
    return parseFloat(modulo(sign.zodiacStart, 360).toFixed(4))
  }

  get ZodiacEnd() {
    const sign = Sign.Data.find(sign => sign.id === this.id)
    return parseFloat(modulo(sign.zodiacEnd, 360).toFixed(4))
  }
}

export default Sign
