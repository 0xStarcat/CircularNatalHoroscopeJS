import { validateAspectTypes, validateAspectPoints } from '../src/utilities/validators'
import { ASPECTS, BODIES, POINTS, ANGLES } from '../src/constants'

describe('validateAspectTypes', () => {
  describe('type checking', () => {
    it('returns valid array', () => {
      const aspects = ['conjunction']
      expect(validateAspectTypes(aspects)).toEqual(aspects)
    })

    it('returns valid string as array', () => {
      const aspects = 'conjunction'
      expect(validateAspectTypes(aspects)).toEqual([aspects])
    })

    it('throws error on invalid type', () => {
      const aspects = {}
      expect(() => validateAspectTypes(aspects)).toThrowError("Please pass a string or an array into aspectTypes")
    })
  })

  describe('aspect checking', () => {
    it('throws error on invalid aspect key', () => {
      const aspects = 'bad aspect'
      expect(() => validateAspectTypes(aspects)).toThrowError("'bad aspect' is not a valid aspect choice. Please use values from the following: all, major, minor, conjunction, opposition, trine, square, sextile, quincunx, quintile, septile, semi-square, semi-sextile")
    })

    it('throws error on invalid aspect key 2', () => {
      const aspects = ['major', 'bad aspect']
      expect(() => validateAspectTypes(aspects)).toThrowError("'major,bad aspect' is not a valid aspect choice. Please use values from the following: all, major, minor, conjunction, opposition, trine, square, sextile, quincunx, quintile, septile, semi-square, semi-sextile")
    })

    it('allows a valid aspect array through', () => {
      const aspects = ['conjunction', 'quintile']
      expect(validateAspectTypes(aspects)).toEqual(aspects)
    })
  })

  describe('aspect type translation', () => {
    it('returns all aspects', () => {
      const aspects = ['all']
      expect(validateAspectTypes(aspects)).toEqual(Object.keys(ASPECTS))
    })

    it('returns all aspects without duplicates', () => {
      const aspects = ['all', 'quincunx', 'major']
      expect(validateAspectTypes(aspects)).toEqual(Object.keys(ASPECTS))
    })

    it('returns major aspects', () => {
      const aspects = ['major']
      expect(validateAspectTypes(aspects)).toEqual(Object.keys(ASPECTS).filter(key => ASPECTS[key].level === 'major'))
    })

    it('returns minor aspects', () => {
      const aspects = ['minor']
      expect(validateAspectTypes(aspects)).toEqual(Object.keys(ASPECTS).filter(key => ASPECTS[key].level === 'minor'))
    })

    it('returns major aspects and single minor aspect', () => {
      const aspects = ['major', 'quincunx']
      expect(validateAspectTypes(aspects)).toEqual(['quincunx', ...Object.keys(ASPECTS).filter(key => ASPECTS[key].level === 'major')])
    })
  })
})


describe('validateAspectPoints', () => {
  describe('aspect checking', () => {
    it('throws error on invalid aspect key', () => {
      const aspects = 'bad point'
      expect(() => validateAspectPoints(aspects)).toThrowError("'bad point' is not a valid aspectPoint choice. Please use values from the following: all, bodies, points, angles, sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto, chiron, sirius, northnode, southnode, lilith, ascendant, midheaven")
    })
  })

  describe('aspect point translation', () => {
    it('returns all aspects points', () => {
      const aspects = ['all']
      const aspectPoints = [...Object.keys(BODIES), ...Object.keys(POINTS), ...Object.keys(ANGLES)]
      expect(validateAspectPoints(aspects)).toEqual(aspectPoints)
    })

    it('returns all aspects without duplicates', () => {
      const aspects = ['all', 'bodies', 'lilith']
      const aspectPoints = [...Object.keys(BODIES), ...Object.keys(POINTS), ...Object.keys(ANGLES)]
      expect(validateAspectPoints(aspects)).toEqual(aspectPoints)
    })

    it('returns bodies', () => {
      const aspects = ['bodies']
      const aspectPoints = [...Object.keys(BODIES)]

      expect(validateAspectPoints(aspects)).toEqual(aspectPoints)
    })

    it('returns points', () => {
      const aspects = ['points']
      const aspectPoints = [...Object.keys(POINTS)]

      expect(validateAspectPoints(aspects)).toEqual(aspectPoints)
    })

    it('returns bodies + angles', () => {
      const aspects = ['bodies', 'angles']
      const aspectPoints = [...Object.keys(BODIES), ...Object.keys(ANGLES)]

      expect(validateAspectPoints(aspects)).toEqual(aspectPoints)
    })

    it('returns bodies + single aspect point', () => {
      const aspects = ['bodies', 'lilith']
      const aspectPoints = [...Object.keys(BODIES)]

      expect(validateAspectPoints(aspects)).toEqual(['lilith', ...aspectPoints])
    })
  })
})
