import moment from 'moment-timezone'
import SunSign from '../src/SunSign'

describe('Constructor validations / errors', () => {
  test('invalid month', () => {
    expect(() => new SunSign({month: 12, date: 1})).toThrowError("The month: \"12\" - must be an integer and between 0 - 11. (0 = January, 11 = December)")
  })

  test('invalid date', () => {
    expect(() => new SunSign({month: 11, date: 32})).toThrowError("The date: \"32 must be between 1 - 31")
  })
})

describe('Tropical Zodiac', () => {
  test('get Scorpio', () => {
    expect(new SunSign({month: 10, date: 20, zodiac: "tropical"}).sign.name).toBe('Scorpio')
  })
})
