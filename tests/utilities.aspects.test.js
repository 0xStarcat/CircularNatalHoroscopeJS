import Origin from '../src/Origin'
import Horoscope from '../src/Horoscope'
import { isAspect, getAspectData, createAspects } from '../src/utilities/aspects'

describe('isAspect', () => {
  it ('returns true when comparison is linear', () => {
    expect(isAspect(100, 200, 100, 0)).toEqual(true)
  })

  it ('returns true when comparison is modulo-ed', () => {
    expect(isAspect(300, 40, 100, 0)).toEqual(true)
  })

  it ('returns true within upper orb when comparison is linear', () => {
    expect(isAspect(100, 210, 100, 10)).toEqual(true)
  })

  it ('returns true within lower orb when comparison is linear', () => {
    expect(isAspect(100, 190, 100, 10)).toEqual(true)
  })

  it ('returns true within upper orb when comparison is modulo-ed', () => {
    expect(isAspect(300, 50, 100, 10)).toEqual(true)
  })

  it ('returns true within lower orb when comparison is modulo-ed', () => {
    expect(isAspect(300, 30, 100, 10)).toEqual(true)
  })

  it ('returns false with linear comparison', () => {
    expect(isAspect(100, 211, 100, 10)).toEqual(false)
  })

  it ('returns false with modulo-ed comparison', () => {
    expect(isAspect(300, 29, 100, 10)).toEqual(false)
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
    const horoscope = new Horoscope({origin: defaultOrigin, aspectPoints: ['all']})

    expect(Object.keys(getAspectData(horoscope))).toHaveLength(17)
  })

  it('returns formatted aspect data for bodies', () => {
    const horoscope = new Horoscope({origin: defaultOrigin, aspectPoints: ['bodies'], aspectWithPoints: ['bodies']})

    expect(Object.keys(getAspectData(horoscope))).toHaveLength(12)
  })

  it('returns formatted aspect data for points and angles', () => {
    const horoscope = new Horoscope({origin: defaultOrigin, aspectPoints: ['points', 'angles'], aspectWithPoints: ['points', 'angles']})

    expect(Object.keys(getAspectData(horoscope))).toHaveLength(5)
  })

  it('returns formatted aspect data for single entries', () => {
    const horoscope = new Horoscope({origin: defaultOrigin, aspectPoints: ['mercury', 'ascendant'], aspectWithPoints: ['mercury', 'ascendant']})

    expect(Object.keys(getAspectData(horoscope))).toHaveLength(2)
  })

  it('returns formatted aspect data combined aspectPoints and aspectWithPoints', () => {
    const horoscope = new Horoscope({origin: defaultOrigin, aspectPoints: ['mercury', 'ascendant'], aspectWithPoints: ['angles']})

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
    const horoscope = new Horoscope({origin: defaultOrigin, aspectPoints: ['all']})
    const aspects = createAspects(horoscope)

    expect(aspects.all).toHaveLength(39)
    expect(aspects.types.conjunction).toHaveLength(8)
    expect(aspects.types.opposition).toHaveLength(9)
    expect(aspects.types.trine).toHaveLength(10)
    expect(aspects.types.square).toHaveLength(5)
    expect(aspects.types.sextile).toHaveLength(7)
    expect(aspects.types.quincunx).toBe(undefined)

    expect(aspects.points.sun).toHaveLength(4)
    expect(aspects.points.moon).toHaveLength(2)
    expect(aspects.points.mercury).toHaveLength(4)
    expect(aspects.points.venus).toHaveLength(7)
    expect(aspects.points.mars).toHaveLength(3)
    expect(aspects.points.jupiter).toHaveLength(5)
    expect(aspects.points.saturn).toHaveLength(6)
    expect(aspects.points.uranus).toHaveLength(3)
    expect(aspects.points.neptune).toHaveLength(8)
    expect(aspects.points.pluto).toHaveLength(8)
    expect(aspects.points.chiron).toHaveLength(3)
    expect(aspects.points.sirius).toHaveLength(3)
    expect(aspects.points.northnode).toHaveLength(5)
    expect(aspects.points.southnode).toHaveLength(5)
    expect(aspects.points.ascendant).toHaveLength(7)
    expect(aspects.points.midheaven).toHaveLength(2)
  })

  it('returns specified aspectPoints with aspectWithPoints', () => {
    const horoscope = new Horoscope({origin: defaultOrigin, aspectPoints: ['all'], aspectWithPoints: ['mercury']})
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
