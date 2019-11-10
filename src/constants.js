import moment from 'moment'

/**
  @constant
  @type {object}
  default orbs from https://astro-charts.com/blog/2018/how-customize-orbs-your-charts/
*/
export const ASPECTS = {
  'conjunction': {
    label: 'Conjunction',
    level: 'major',
    angle: 0,
    defaultOrb: 8
  },
  'opposition': {
    label: 'Opposition',
    level: 'major',
    angle: 180,
    defaultOrb: 8
  },
  'trine': {
    label: 'Trine',
    level: 'major',
    angle: 120,
    defaultOrb: 8
  },
  'square': {
    label: 'Square',
    level: 'major',
    angle: 90,
    defaultOrb: 7
  },
  'sextile': {
    label: 'Sextile',
    level: 'major',
    angle: 60,
    defaultOrb: 6
  },
  'quincunx': {
    label: 'Quincunx',
    level: 'minor',
    angle: 150,
    defaultOrb: 5
  },
  'quintile': {
    label: 'Quintile',
    level: 'minor',
    angle: 72,
    defaultOrb: 1
  },
  'septile': {
    label: 'Septile',
    level: 'minor',
    angle: 51.5,
    defaultOrb: 1
  },
  'semi-square': {
    label: 'Semi-Square',
    level: 'minor',
    angle: 45,
    defaultOrb: 1
  },
  'semi-sextile': {
    label: 'Semi-Sextile',
    level: 'minor',
    angle: 30,
    defaultOrb: 1
  }
}

export const BODIES = {
  'sun': {
    label: 'Sun'
  },
  'moon': {
    label: 'Moon'
  },
  'mercury': {
    label: 'Mercury'
  },
  'venus': {
    label: 'Venus'
  },
  'mars': {
    label: 'Mars'
  },
  'jupiter': {
    label: 'Jupiter'
  },
  'saturn': {
    label: 'Saturn'
  },
  'uranus': {
    label: 'Uranus'
  },
  'neptune': {
    label: 'Neptune'
  },
  'pluto': {
    label: 'Pluto'
  },
  'chiron': {
    label: 'Chiron'
  },
  'sirius': {
    label: 'Sirius'
  }
}

export const POINTS = {
  'northnode': {
    label: 'North Node'
  },
  'southnode': {
    label: 'South Node'
  },
  lilith: {
    label: 'Lilith'
  }
}

export const ANGLES = {
  'ascendant': {
    label: 'Ascendant'
  },
  'midheaven': {
    label: 'Midheaven'
  }
}

export const HOUSES = {
  '1': {
    label: 'First'
  }
}

export const SIGNS = [
  {
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
    name: 'Sagittarius',
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
    zodiacStart: 240,
    zodiacEnd: 270
  },
  {
    id: 9,
    name: 'Capricorn',
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
    zodiacStart: 270,
    zodiacEnd: 300
  },
  {
    id: 10,
    name: 'Aquarius',
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
    zodiacStart: 300,
    zodiacEnd: 330
  },
  {
    id: 11,
    name: 'Pisces',
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
    zodiacStart: 330,
    zodiacEnd: 0
  }
]
