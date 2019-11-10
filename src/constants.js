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
