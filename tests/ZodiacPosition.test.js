import ZodiacPosition from '../src/ZodiacPosition'

describe('ZodiacPosition', () => {
  describe('getters', () => {
    test('Sign', () => {
      expect(new ZodiacPosition({decimalDegrees: 30.30, zodiac: 'tropical'}).Sign.label).toEqual("Taurus")
    })
  })
})
