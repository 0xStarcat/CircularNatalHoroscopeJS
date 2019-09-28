import Origin from '../src/Origin'
import Horoscope from '../src/Horoscope'

const defaultOrigin = new Origin({
  year: 2019, // July 20, 2019 10:10am local time
  month: 6,
  date: 20,
  hour: 10,
  minute: 10,
  latitude: 34.052235, // los angeles
  longitude: -118.243683
})

describe('Construction Validation & Errors', () => {
  describe('house system validation', () => {
    const origin = defaultOrigin

    test('Passing in an invalid houseSystem string', () => {
      expect(() => new Horoscope({origin: origin, houseSystem: 'TEST'})).toThrowError(/The "TEST" house system is not included. Please choose from the following list:/)
    })

    test('Padding in a valid houseSystem string', () => {
      expect(new Horoscope({origin: origin, houseSystem: "Placidus"}).houseSystem).toBe('placidus')
    })
  })
})

describe('Midheaven & Ascendent calculations', () => {
  test('Northern Hemisphere Horoscope calculations', () => {
    const origin = defaultOrigin

    const horoscope = new Horoscope({
      origin
    })

    expect(horoscope.midheaven).toBe(78.4576237174029)
    expect(horoscope.ascendent).toBe(169.4304413315524)
  })

  test('Southern Hemisphere Horoscope calculations', () => {
    const origin = new Origin({
      year: 2019, // July 20, 2019 10:10am local time
      month: 6,
      date: 20,
      hour: 10,
      minute: 10,
      latitude: -34.603722, // Buenos Aires, Argentina
      longitude: -58.381592
    })

    const horoscope = new Horoscope({
      origin
    })

    expect(horoscope.midheaven).toBe(78.17823398760186)
    expect(horoscope.ascendent).toBe(160.2684369319495)
  })
})

describe('House cusp calculation', () => {
  test('Placidus', () => {    
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'placidus'}).houseCusps).toEqual(["169.4304","195.8759","226.0562","258.4576","290.9246","321.6638","349.4304","15.8759","46.0562","78.4576","110.9246","141.6638"])
  })
})
