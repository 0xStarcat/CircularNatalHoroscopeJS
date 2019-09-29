import moment from 'moment-timezone'

class Sign {
  constructor({id=0, zodiac="tropical"}={}) {
    this.id = id
    this.zodiac = this.validateZodiac(zodiac.toLowerCase())

  }

  static get Data() {
    return [{
        id: 0,
        name: 'Aries',
        tropicalStartMonth: 2, tropicalStartDate: 21, tropicalEndMonth: 3, tropicalEndDate: 19,
        siderealStartMonth: 3, siderealStartDate: 14, siderealEndMonth: 4, siderealEndDate: 14,
        astronomicalStartMonth: 3, astronomicalStartDate: 18, astronomicalEndMonth: 4, astronomicalEndDate: 12,
        eclipticStart: 0,
        eclipticEnd: 30
      },
      {
        id: 1,
        name: 'Taurus',
        tropicalStartMonth: 3, tropicalStartDate: 20, tropicalEndMonth: 4, tropicalEndDate: 20,
        siderealStartMonth: 4, siderealStartDate: 15, siderealEndMonth: 5, siderealEndDate: 14,
        astronomicalStartMonth: 4, astronomicalStartDate: 13, astronomicalEndMonth: 5, astronomicalEndDate: 20,
        eclipticStart: 30,
        eclipticEnd: 60
      },
      {
        id: 2,
        name: 'Gemini',
        tropicalStartMonth: 4, tropicalStartDate: 21, tropicalEndMonth: 5, tropicalEndDate: 20,
        siderealStartMonth: 5, siderealStartDate: 15, siderealEndMonth: 6, siderealEndDate: 15,
        astronomicalStartMonth: 5, astronomicalStartDate: 21, astronomicalEndMonth: 6, astronomicalEndDate: 19,
        eclipticStart: 60,
        eclipticEnd: 90
      },
      {
        id: 3,
        name: 'Cancer',
        tropicalStartMonth: 5, tropicalStartDate: 21, tropicalEndMonth: 6, tropicalEndDate: 22,
        siderealStartMonth: 6, siderealStartDate: 16, siderealEndMonth: 7, siderealEndDate: 16,
        astronomicalStartMonth: 6, astronomicalStartDate: 20, astronomicalEndMonth: 7, astronomicalEndDate: 9,
        eclipticStart: 90,
        eclipticEnd: 120
      },
      {
        id: 4,
        name: 'Leo',
        tropicalStartMonth: 6, tropicalStartDate: 23, tropicalEndMonth: 7, tropicalEndDate: 22,
        siderealStartMonth: 7, siderealStartDate: 17, siderealEndMonth: 8, siderealEndDate: 16,
        astronomicalStartMonth: 7, astronomicalStartDate: 10, astronomicalEndMonth: 8, astronomicalEndDate: 15,
        eclipticStart: 120,
        eclipticEnd: 150
      },
      {
        id: 5,
        name: 'Virgo',
        tropicalStartMonth: 7, tropicalStartDate: 23, tropicalEndMonth: 8, tropicalEndDate: 22,
        siderealStartMonth: 8, siderealStartDate: 17, siderealEndMonth: 9, siderealEndDate: 16,
        astronomicalStartMonth: 8, astronomicalStartDate: 16, astronomicalEndMonth: 9, astronomicalEndDate: 29,
        eclipticStart: 150,
        eclipticEnd: 180
      },
      {
        id: 6,
        name: 'Libra',
        tropicalStartMonth: 8, tropicalStartDate: 23, tropicalEndMonth: 9, tropicalEndDate: 22,
        siderealStartMonth: 9, siderealStartDate: 17, siderealEndMonth: 10, siderealEndDate: 15,
        astronomicalStartMonth: 9, astronomicalStartDate: 30, astronomicalEndMonth: 10, astronomicalEndDate: 22,
        eclipticStart: 180,
        eclipticEnd: 210
      },
      {
        id: 7,
        name: 'Scorpio',
        tropicalStartMonth: 9, tropicalStartDate: 23, tropicalEndMonth: 10, tropicalEndDate: 21,
        siderealStartMonth: 10, siderealStartDate: 16, siderealEndMonth: 11, siderealEndDate: 15,
        astronomicalStartMonth: 10, astronomicalStartDate: 23, astronomicalEndMonth: 10, astronomicalEndDate: 28,
        eclipticStart: 210,
        eclipticEnd: 240
      },
      {
        id: 12,
        name: 'Ophiuchus',
        astronomicalStartMonth: 10, astronomicalStartDate: 29, astronomicalEndMonth: 11, astronomicalEndDate: 16,
        eclipticStart: -1,
        eclipticEnd: -1
      },
      {
        id: 8,
        name: 'Sagittarius',
        tropicalStartMonth: 10, tropicalStartDate: 22, tropicalEndMonth: 11, tropicalEndDate: 21,
        siderealStartMonth: 11, siderealStartDate: 16, siderealEndMonth: 0, siderealEndDate: 13,
        astronomicalStartMonth: 11, astronomicalStartDate: 17, astronomicalEndMonth: 0, astronomicalEndDate: 19,
        eclipticStart: 240,
        eclipticEnd: 270
      },
      {
        id: 9,
        name: 'Capricorn',
        tropicalStartMonth: 11, tropicalStartDate: 22, tropicalEndMonth: 0, tropicalEndDate: 19,
        siderealStartMonth: 0, siderealStartDate: 14, siderealEndMonth: 1, siderealEndDate: 12,
        astronomicalStartMonth: 0, astronomicalStartDate: 20, astronomicalEndMonth: 1, astronomicalEndDate: 15,
        eclipticStart: 270,
        eclipticEnd: 300
      },
      {
        id: 10,
        name: 'Aquarius',
        tropicalStartMonth: 0, tropicalStartDate: 20, tropicalEndMonth: 1, tropicalEndDate: 18,
        siderealStartMonth: 1, siderealStartDate: 13, siderealEndMonth: 2, siderealEndDate: 12,
        astronomicalStartMonth: 1, astronomicalStartDate: 16, astronomicalEndMonth: 2, astronomicalEndDate: 10,
        eclipticStart: 300,
        eclipticEnd: 330
      },
      {
        id: 11,
        name: 'Pisces',
        tropicalStartMonth: 1, tropicalStartDate: 19, tropicalEndMonth: 2, tropicalEndDate: 20,
        siderealStartMonth: 2, siderealStartDate: 13, siderealEndMonth: 3, siderealEndDate: 13,
        astronomicalStartMonth: 2, astronomicalStartDate: 11, astronomicalEndMonth: 3, astronomicalEndDate: 17,
        eclipticStart: 330,
        eclipticEnd: 360
      }]
  }

  static get Astronomical() {
    return Sign.Data.map(sign => new Sign({id: sign.id, zodiac: 'astronomical'}))
  }

  static get Sidereal() {
    return Sign.Data.map(sign => new Sign({id: sign.id, zodiac: 'sidereal'}))
  }

  static get Tropical() {
    return Sign.Data.map(sign => new Sign({id: sign.id, zodiac: 'tropical'}))
  }

  static get Zodiacs() {
    return ['astronomical', 'sidereal', 'tropical']
  }

  validateZodiac(string) {
    if (Sign.Zodiacs.includes(string.toLowerCase())) return string.toLowerCase()
    else throw new Error(`The "${string}" zodiac is not included. Please choose from the following list: ${Sign.Zodiacs.join(', ')}.`)
  }

  get Name() {
    return Sign.Data.find(sign => sign.id === this.id).name
  }

  get StartDate() {
    const sign = Sign.Data.find(sign => sign.id === this.id)
    switch(this.zodiac) {
      case 'astronomical':
        return moment.tz({month: sign.astronomicalStartMonth, date: sign.astronomicalStartDate, hour: 0}, 'UTC').startOf('day')
      case 'sidereal':
        return moment.tz({month: sign.siderealStartMonth, date: sign.siderealStartDate, hour: 0}, 'UTC').startOf('day')
      case 'tropical':
        return moment.tz({month: sign.tropicalStartMonth, date: sign.tropicalStartDate, hour: 0}, 'UTC').startOf('day')
    }
  }

  get EndDate() {
    const sign = Sign.Data.find(sign => sign.id === this.id)
    let startDate
    switch(this.zodiac) {
      case 'astronomical':
        startDate = moment({month: sign.astromicalStartMonth, date: sign.astromicalStartDate, hour: 0}).startOf('day')
        return moment.tz({month: sign.astronomicalEndMonth, date: sign.astronomicalEndDate, year: startDate.month() === 11 && sign.tropicalEndMonth === 0 ? startDate.year() + 1 : startDate.year()}, 'UTC').endOf('day')
      case 'sidereal':
        startDate = moment({month: sign.siderealStartMonth, date: sign.siderealStartDate, hour: 0}).startOf('day')
        return moment.tz({month: sign.siderealEndMonth, date: sign.siderealEndDate, year: startDate.month() === 11 && sign.tropicalEndMonth === 0 ? startDate.year() + 1 : startDate.year()}, 'UTC').endOf('day')
      case 'tropical':
        startDate = moment({month: sign.tropicalStartMonth, date: sign.tropicalStartDate, hour: 0}).startOf('day')
        return moment.tz({month: sign.tropicalEndMonth, date: sign.tropicalEndDate, year: startDate.month() === 11 && sign.tropicalEndMonth === 0 ? startDate.year() + 1 : startDate.year()}, 'UTC').endOf('day')
    }
  }
}

export default Sign
