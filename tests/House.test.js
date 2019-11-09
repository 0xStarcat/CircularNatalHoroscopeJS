import House from '../src/House'

describe('House', () => {
  describe('StartPosition', () => {
    it('returns values', () => {
      const house = new House({ascendantDegrees: 0, name: 'House 1', zodiacDegreesStart: 10, zodiacDegreesEnd: 30})

      expect(house.StartPosition.Zodiac.DecimalDegrees).toEqual(10)
      expect(house.StartPosition.Ecliptic.DecimalDegrees).toEqual(350)
    })
  })

  describe('EndPosition', () => {
    it('returns values', () => {
      const house = new House({ascendantDegrees: 0, name: 'House 1', zodiacDegreesStart: 10, zodiacDegreesEnd: 30})

      expect(house.EndPosition.Zodiac.DecimalDegrees).toEqual(30)
      expect(house.EndPosition.Ecliptic.DecimalDegrees).toEqual(330)
    })
  })
})
