import Sign from '../src/Sign'

describe('Sign', () => {
  describe('constructor', () => {
    test('invalid zodiac', () => {
      expect(() => new Sign({id: 11, zodiac: "TEST"})).toThrowError("The \"test\" zodiac is not included. Please choose from the following list: astronomical, sidereal, tropical.")
    })

    test('Get Name', () => {
      expect(new Sign({id: 11}).Name).toBe('Pisces')
    })
  })

  describe('Tropical', () => {
    describe('getters', () => {
      test('Get StartDate', () => {
        expect(new Sign({id: 11}).StartDate.format('MM/DD')).toBe("02/19")
      })

      test('Get EndDate', () => {
        expect(new Sign({id: 11}).EndDate.format('MM/DD')).toBe("03/20")
      })

      test('Get ZodiacStart', () => {
        expect(new Sign({id: 11}).ZodiacStart).toBe(330)
      })

      test('Get ZodiacEnd', () => {
        expect(new Sign({id: 11}).ZodiacEnd).toBe(0)
      })
    })
  })

  describe('Sidereal', () => {
    describe('getters', () => {
      test('Get StartDate', () => {
        expect(new Sign({id: 11, zodiac: 'sidereal'}).StartDate.format('MM/DD')).toBe("03/13")
      })

      test('Get EndDate', () => {
        expect(new Sign({id: 11, zodiac: 'sidereal'}).EndDate.format('MM/DD')).toBe("04/13")
      })

      test('Get ZodiacStart', () => {
        expect(new Sign({id: 11, zodiac: 'sidereal'}).ZodiacStart).toBe(354.1)
      })

      test('Get ZodiacEnd', () => {
        expect(new Sign({id: 11, zodiac: 'sidereal'}).ZodiacEnd).toBe(24.1)
      })
    })
  })

  describe('Astronomical', () => {
    describe('getters', () => {
      test('Get StartDate', () => {
        expect(new Sign({id: 11, zodiac: 'astronomical'}).StartDate.format('MM/DD')).toBe("03/11")
      })

      test('Get EndDate', () => {
        expect(new Sign({id: 11, zodiac: 'astronomical'}).EndDate.format('MM/DD')).toBe("04/17")
      })

      test('Get ZodiacStart', () => {
        expect(new Sign({id: 11, zodiac: 'astronomical'}).ZodiacStart).toBe(354.1)
      })

      test('Get ZodiacEnd', () => {
        expect(new Sign({id: 11, zodiac: 'astronomical'}).ZodiacEnd).toBe(24.1)
      })
    })
  })
})
