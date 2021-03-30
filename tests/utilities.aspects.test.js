import Origin from '../src/Origin'
import Horoscope from '../src/Horoscope'
import { isAspect, getAspectData, createAspects, calculateOrb } from '../src/utilities/aspects'

describe('isAspect', () => {
  it('returns true when comparison is linear', () => {
    expect(isAspect(100, 200, 100, 0)).toEqual(true)
  })

  it('returns true when comparison is modulo-ed', () => {
    expect(isAspect(300, 40, 100, 0)).toEqual(true)
  })

  it('returns true within upper orb when comparison is linear', () => {
    expect(isAspect(100, 210, 100, 10)).toEqual(true)
  })

  it('returns true within lower orb when comparison is linear', () => {
    expect(isAspect(100, 190, 100, 10)).toEqual(true)
  })

  it('returns true within upper orb when comparison is modulo-ed', () => {
    expect(isAspect(300, 50, 100, 10)).toEqual(true)
  })

  it('returns true within lower orb when comparison is modulo-ed', () => {
    expect(isAspect(300, 30, 100, 10)).toEqual(true)
  })

  it('returns false with linear comparison', () => {
    expect(isAspect(100, 211, 100, 10)).toEqual(false)
  })

  it('returns false with modulo-ed comparison', () => {
    expect(isAspect(300, 29, 100, 10)).toEqual(false)
  })

  describe('edge cases', () => {
    it('returns true', () => {
      expect(isAspect(240.45, 239.61, 0, 8)).toEqual(true) // conjunction
    })

    it('returns true', () => {
      expect(isAspect(184.09, 240.45, 60, 6)).toEqual(true) // sextile
    })
  })
})

describe('calculateOrb', () => {
  it('calculates correctly when point 1 is > point 2', () => {
    const aspectAngle = 0 // conjunction
    const maxOrb = 8
    const point1 = 180
    const point2 = 179

    expect(calculateOrb(aspectAngle, maxOrb, point1, point2)).toEqual(1)
  })

  it('calculates correctly when point 1 is < point 2', () => {
    const aspectAngle = 0 // conjunction
    const maxOrb = 8
    const point1 = 180
    const point2 = 182

    expect(calculateOrb(aspectAngle, maxOrb, point1, point2)).toEqual(2)
  })

  it('calculates correctly when point 1 is = point 2', () => {
    const aspectAngle = 0 // conjunction
    const maxOrb = 8
    const point1 = 180
    const point2 = 180

    expect(calculateOrb(aspectAngle, maxOrb, point1, point2)).toEqual(0)
  })

  it('calculates correctly when point 1 is on the other side of the circle and < point 2', () => {
    const aspectAngle = 0 // conjunction
    const maxOrb = 8
    const point1 = 359
    const point2 = 1

    expect(calculateOrb(aspectAngle, maxOrb, point1, point2)).toEqual(2)
  })

  it('calculates correctly when point 1 is on the other side of the circle and > point 2', () => {
    const aspectAngle = 0 // conjunction
    const maxOrb = 8
    const point1 = 4
    const point2 = 359

    expect(calculateOrb(aspectAngle, maxOrb, point1, point2)).toEqual(5)
  })

  it('With an opposition aspect', () => {
    const aspectAngle = 180 // opposition
    const maxOrb = 8
    const point1 = 180
    const point2 = 359

    expect(calculateOrb(aspectAngle, maxOrb, point1, point2)).toEqual(1)
  })

  it('With a trine aspect', () => {
    const aspectAngle = 120 // trine
    const maxOrb = 8
    const point1 = 61
    const point2 = 300

    expect(calculateOrb(aspectAngle, maxOrb, point1, point2)).toEqual(1)
  })

  it('With a square aspect', () => {
    const aspectAngle = 90 // square
    const maxOrb = 8
    const point1 = 60
    const point2 = 152

    expect(calculateOrb(aspectAngle, maxOrb, point1, point2)).toEqual(2)
  })

  it('With a sextile aspect', () => {
    const aspectAngle = 60 // sextile
    const maxOrb = 8
    const point1 = 330
    const point2 = 25

    expect(calculateOrb(aspectAngle, maxOrb, point1, point2)).toEqual(5)
  })
})


describe('getAspectData', () => {
  const defaultOrigin = new Origin({
    year: 2019, // July 20, 2019 10:10am local time
    month: 6,
    date: 20,
    hour: 10,
    minute: 10,
    latitude: 34.052235, // los angeles
    longitude: -118.243683
  })

  it('returns all formatted aspect data', () => {
    const horoscope = new Horoscope({ origin: defaultOrigin, aspectPoints: ['all'] })

    expect(Object.keys(getAspectData(horoscope))).toHaveLength(17)
  })

  it('returns formatted aspect data for bodies', () => {
    const horoscope = new Horoscope({ origin: defaultOrigin, aspectPoints: ['bodies'], aspectWithPoints: ['bodies'] })

    expect(Object.keys(getAspectData(horoscope))).toHaveLength(12)
  })

  it('returns formatted aspect data for points and angles', () => {
    const horoscope = new Horoscope({ origin: defaultOrigin, aspectPoints: ['points', 'angles'], aspectWithPoints: ['points', 'angles'] })

    expect(Object.keys(getAspectData(horoscope))).toHaveLength(5)
  })

  it('returns formatted aspect data for single entries', () => {
    const horoscope = new Horoscope({ origin: defaultOrigin, aspectPoints: ['mercury', 'ascendant'], aspectWithPoints: ['mercury', 'ascendant'] })

    expect(Object.keys(getAspectData(horoscope))).toHaveLength(2)
  })

  it('returns formatted aspect data combined aspectPoints and aspectWithPoints', () => {
    const horoscope = new Horoscope({ origin: defaultOrigin, aspectPoints: ['mercury', 'ascendant'], aspectWithPoints: ['angles'] })

    expect(Object.keys(getAspectData(horoscope))).toHaveLength(3)
  })
})

describe('createAspects', () => {
  const defaultOrigin = new Origin({
    year: 2019, // July 20, 2019 10:10am local time
    month: 6,
    date: 20,
    hour: 10,
    minute: 10,
    latitude: 34.052235, // los angeles
    longitude: -118.243683
  })

  it('returns all formatted aspect data', () => {
    const horoscope = new Horoscope({ origin: defaultOrigin, aspectPoints: ['all'] })
    const aspects = createAspects(horoscope)

    expect(aspects.all).toHaveLength(41)
    expect(aspects.types.conjunction).toHaveLength(8)
    expect(aspects.types.opposition).toHaveLength(9)
    expect(aspects.types.trine).toHaveLength(11)
    expect(aspects.types.square).toHaveLength(6)
    expect(aspects.types.sextile).toHaveLength(7)
    expect(aspects.types.quincunx).toBe(undefined)

    expect(aspects.points.sun).toHaveLength(4)
    expect(aspects.points.moon).toHaveLength(4)
    expect(aspects.points.mercury).toHaveLength(4)
    expect(aspects.points.venus).toHaveLength(7)
    expect(aspects.points.mars).toHaveLength(3)
    expect(aspects.points.jupiter).toHaveLength(6)
    expect(aspects.points.saturn).toHaveLength(6)
    expect(aspects.points.uranus).toHaveLength(3)
    expect(aspects.points.neptune).toHaveLength(8)
    expect(aspects.points.pluto).toHaveLength(8)
    expect(aspects.points.chiron).toHaveLength(3)
    expect(aspects.points.sirius).toHaveLength(3)
    expect(aspects.points.northnode).toHaveLength(6)
    expect(aspects.points.southnode).toHaveLength(5)
    expect(aspects.points.ascendant).toHaveLength(7)
    expect(aspects.points.midheaven).toHaveLength(2)
  })

  it('returns all formatted aspect data and uses customOrbs', () => {
    const horoscope = new Horoscope({ origin: defaultOrigin, aspectPoints: ['all'], customOrbs: { conjunction: 10 } })
    const aspects = createAspects(horoscope)

    expect(aspects.all).toHaveLength(44)
    expect(aspects.types.conjunction).toHaveLength(11)
    expect(aspects.types.opposition).toHaveLength(9)
    expect(aspects.types.trine).toHaveLength(11)
    expect(aspects.types.square).toHaveLength(6)
    expect(aspects.types.sextile).toHaveLength(7)
    expect(aspects.types.quincunx).toBe(undefined)

    expect(aspects.points.sun).toHaveLength(4)
    expect(aspects.points.moon).toHaveLength(5)
    expect(aspects.points.mercury).toHaveLength(5)
    expect(aspects.points.venus).toHaveLength(8)
    expect(aspects.points.mars).toHaveLength(3)
    expect(aspects.points.jupiter).toHaveLength(6)
    expect(aspects.points.saturn).toHaveLength(6)
    expect(aspects.points.uranus).toHaveLength(3)
    expect(aspects.points.neptune).toHaveLength(10)
    expect(aspects.points.pluto).toHaveLength(8)
    expect(aspects.points.chiron).toHaveLength(3)
    expect(aspects.points.sirius).toHaveLength(3)
    expect(aspects.points.northnode).toHaveLength(6)
    expect(aspects.points.southnode).toHaveLength(5)
    expect(aspects.points.ascendant).toHaveLength(7)
    expect(aspects.points.midheaven).toHaveLength(2)
  })

  it('returns specified aspectPoints with aspectWithPoints', () => {
    const horoscope = new Horoscope({ origin: defaultOrigin, aspectPoints: ['all'], aspectWithPoints: ['mercury'] })
    const aspects = createAspects(horoscope)

    expect(aspects.all).toHaveLength(4)
    expect(aspects.types.conjunction).toHaveLength(1)
    expect(aspects.types.opposition).toHaveLength(1)
    expect(aspects.types.trine).toHaveLength(2)
    expect(aspects.types.square).toBe(undefined)
    expect(aspects.types.sextile).toBe(undefined)
    expect(aspects.types.quincunx).toBe(undefined)

    expect(aspects.points.sun).toHaveLength(1)
    expect(aspects.points.moon).toBe(undefined)
    expect(aspects.points.mercury).toHaveLength(4)
    expect(aspects.points.venus).toBe(undefined)
    expect(aspects.points.mars).toBe(undefined)
    expect(aspects.points.jupiter).toBe(undefined)
    expect(aspects.points.saturn).toBe(undefined)
    expect(aspects.points.uranus).toBe(undefined)
    expect(aspects.points.neptune).toBe(undefined)
    expect(aspects.points.pluto).toHaveLength(1)
    expect(aspects.points.chiron).toHaveLength(1)
    expect(aspects.points.sirius).toHaveLength(1)
    expect(aspects.points.northnode).toBe(undefined)
    expect(aspects.points.southnode).toBe(undefined)
    expect(aspects.points.ascendant).toBe(undefined)
    expect(aspects.points.midheaven).toBe(undefined)

  })
})
