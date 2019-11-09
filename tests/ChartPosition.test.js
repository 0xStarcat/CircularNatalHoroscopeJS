import ChartPosition from '../src/ChartPosition'

describe('ChartPosition', () => {
  describe('getters', () => {
    describe('zodiac', () => {
      test('DecimalDegrees', () => {
        expect(new ChartPosition({zodiacDegrees: 30.30, eclipticDegrees: 0}).Zodiac.DecimalDegrees).toBe(30.30)
      })

      test('ArcDegrees', () => {
        expect(new ChartPosition({zodiacDegrees: 30.30, eclipticDegrees: 0}).Zodiac.ArcDegrees).toStrictEqual({"degrees": 30, "minutes": 18, "seconds": 0})
      })

      test('ArcDegreesFormatted', () => {
        expect(new ChartPosition({zodiacDegrees: 30.321, eclipticDegrees: 0}).Zodiac.ArcDegreesFormatted).toBe("30° 19' 16''")
      })
    })

    describe('ecliptic', () => {
      test('DecimalDegrees', () => {
        expect(new ChartPosition({zodiacDegrees: 30.30, eclipticDegrees: 0}).Ecliptic.DecimalDegrees).toBe(0)
      })

      test('ArcDegrees', () => {
        expect(new ChartPosition({zodiacDegrees: 30.30, eclipticDegrees: 0}).Ecliptic.ArcDegrees).toStrictEqual({"degrees": 0, "minutes": 0, "seconds": 0})
      })

      test('ArcDegreesFormatted', () => {
        expect(new ChartPosition({zodiacDegrees: 30.321, eclipticDegrees: 0}).Ecliptic.ArcDegreesFormatted).toBe("0° 0' 0''")
      })
    })
  })
})
