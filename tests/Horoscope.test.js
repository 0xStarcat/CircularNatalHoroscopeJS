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

describe('Midheaven & ascendant calculations', () => {
  test('Northern Hemisphere Horoscope calculations', () => {
    const origin = defaultOrigin

    const horoscope = new Horoscope({
      origin
    })

    expect(horoscope.midheaven).toBe(78.4576237174029)
    expect(horoscope.ascendant).toBe(169.4304413315524)
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
    expect(horoscope.ascendant).toBe(160.2684369319495)
  })
})

describe('House cusp calculation', () => {
  test('Equal House', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'equal house'}).houseCusps).toEqual(["169.4304","199.4304","229.4304","259.4304","289.4304","319.4304","349.4304","19.4304","49.4304","79.4304","109.4304","139.4304"])
  })

  test('Koch', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'koch'}).houseCusps).toEqual([ '169.4304', '199.3303', '228.7571', '258.4576', '290.4533', '319.8347', '349.4304', '19.3303', '48.7571', '78.4576', '110.4533', '139.8347' ])
  })

  test('Placidus', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'placidus'}).houseCusps).toEqual(["169.4304","195.8759","226.0562","258.4576","290.9246","321.6638","349.4304","15.8759","46.0562","78.4576","110.9246","141.6638"])
  })

  test('Regiomontanus', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'regiomontanus'}).houseCusps).toEqual([ '169.4304', '195.1442', '224.3037', '258.4576', '293.2347', '323.3454', '349.4304', '15.1442', '44.3037', '78.4576', '113.2347', '143.3454' ])
  })

  test('Whole sign', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'whole sign'}).houseCusps).toEqual([150.00, 180.00, 210.00, 240.00, 270.00, 300.00, 330.00, 0.00, 30.00, 60.00, 90.00, 120.00])
  })
})
