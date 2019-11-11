import Sign from '../src/Sign'

describe('Sign', () => {
  describe('constructor', () => {
    test('invalid zodiac', () => {
      expect(() => new Sign({key: 'pisces', zodiac: "TEST"})).toThrowError("The \"test\" zodiac is not included. Please choose from the following list: sidereal, tropical.")
    })

    test('Get label', () => {
      expect(new Sign({key: 'pisces'}).label).toBe('Pisces')
    })
  })

  describe('Tropical', () => {
    describe('getters', () => {
      test('Get StartDate', () => {
        expect(new Sign({key: 'pisces'}).StartDate.format('MM/DD')).toBe("02/19")
      })

      test('Get EndDate', () => {
        expect(new Sign({key: 'pisces'}).EndDate.format('MM/DD')).toBe("03/20")
      })

      test('Get ZodiacStart', () => {
        expect(new Sign({key: 'pisces'}).ZodiacStart).toBe(330)
      })

      test('Get ZodiacEnd', () => {
        expect(new Sign({key: 'pisces'}).ZodiacEnd).toBe(0)
      })
    })
  })

  describe('Sidereal', () => {
    describe('getters', () => {
      test('Get StartDate', () => {
        expect(new Sign({key: 'pisces', zodiac: 'sidereal'}).StartDate.format('MM/DD')).toBe("03/16")
      })

      test('Get EndDate', () => {
        expect(new Sign({key: 'pisces', zodiac: 'sidereal'}).EndDate.format('MM/DD')).toBe("04/14")
      })

      test('Get ZodiacStart', () => {
        expect(new Sign({key: 'pisces', zodiac: 'sidereal'}).ZodiacStart).toBe(330)
      })

      test('Get ZodiacEnd', () => {
        expect(new Sign({key: 'pisces', zodiac: 'sidereal'}).ZodiacEnd).toBe(0)
      })
    })
  })

  // describe('Astronomical', () => {
  //   describe('getters', () => {
  //     test('Get StartDate', () => {
  //       expect(new Sign({key: 'pisces', zodiac: 'astronomical'}).StartDate.format('MM/DD')).toBe("03/12")
  //     })
  //
  //     test('Get EndDate', () => {
  //       expect(new Sign({key: 'pisces', zodiac: 'astronomical'}).EndDate.format('MM/DD')).toBe("04/18")
  //     })
  //
  //     test('Get ZodiacStart', () => {
  //       expect(new Sign({key: 'pisces', zodiac: 'astronomical'}).ZodiacStart).toBe(330)
  //     })
  //
  //     test('Get ZodiacEnd', () => {
  //       expect(new Sign({key: 'pisces', zodiac: 'astronomical'}).ZodiacEnd).toBe(0)
  //     })
  //   })
  // })
})
