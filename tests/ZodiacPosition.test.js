import ZodiacPosition from '../src/ZodiacPosition'

describe('ZodiacPosition', () => {
  describe('getters', () => {
    test('Sign', () => {
      expect(new ZodiacPosition({decimalDegrees: 30.30, sign: 'TEST'}).Sign).toBe("TEST")
    })

    test('DecimalDegrees', () => {
      expect(new ZodiacPosition({decimalDegrees: 30.30, sign: 'TEST'}).DecimalDegrees).toBe(30.30)
    })

    test('ArcDegrees', () => {
      expect(new ZodiacPosition({decimalDegrees: 30.30, sign: 'TEST'}).ArcDegrees).toStrictEqual({"degrees": 30, "minutes": 18, "seconds": 0})
    })

    test('ArcDegreesFormatted', () => {
      expect(new ZodiacPosition({decimalDegrees: 30.321, sign: 'TEST'}).ArcDegreesFormatted).toBe("30° 19' 16''")
    })
  })
})
