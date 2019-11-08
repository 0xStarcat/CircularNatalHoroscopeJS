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
      expect(new Horoscope({origin: origin, houseSystem: "Placidus"})._houseSystem).toBe('placidus')
    })

    test('invalid zodiac', () => {
      expect(() => new Horoscope({origin: origin, zodiac: "TEST"})).toThrowError("The \"test\" zodiac is not included. Please choose from the following list: astronomical, sidereal, tropical.")
    })
  })
})

describe('Midheaven & ascendant calculations', () => {
  test('Northern Hemisphere Horoscope calculations', () => {
    const origin = defaultOrigin

    const horoscope = new Horoscope({
      origin
    })

    expect(horoscope.Midheaven.DecimalDegrees).toBe(78.4576237174029)
    expect(horoscope.Midheaven.ArcDegreesFormatted).toBe("78° 27' 27''")
    expect(horoscope.Midheaven.Sign.Name).toBe("Gemini")
    expect(horoscope.Ascendant.DecimalDegrees).toBe(169.4304413315524)
    expect(horoscope.Ascendant.ArcDegreesFormatted).toBe("169° 25' 50''")
    expect(horoscope.Ascendant.Sign.Name).toBe("Virgo")
  })

  test('Sidereal Northern Hemisphere Horoscope calculations', () => {
    const origin = defaultOrigin

    const horoscope = new Horoscope({
      origin,
      zodiac: 'sidereal'
    })

    expect(horoscope.Midheaven.DecimalDegrees).toBe(78.4576237174029)
    expect(horoscope.Midheaven.ArcDegreesFormatted).toBe("78° 27' 27''")
    // expect(horoscope.Midheaven.Sign.Name).toBe("Taurus")
    expect(horoscope.Ascendant.DecimalDegrees).toBe(169.4304413315524)
    expect(horoscope.Ascendant.ArcDegreesFormatted).toBe("169° 25' 50''")
    // expect(horoscope.Ascendant.Sign.Name).toBe("Leo")
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

    expect(horoscope.Midheaven.DecimalDegrees).toBe(78.17823398760186)
    expect(horoscope.Midheaven.ArcDegreesFormatted).toBe("78° 10' 42''")
    expect(horoscope.Midheaven.Sign.Name).toBe("Gemini")
    expect(horoscope.Ascendant.DecimalDegrees).toBe(160.2684369319495)
    expect(horoscope.Ascendant.ArcDegreesFormatted).toBe("160° 16' 6''")
    expect(horoscope.Ascendant.Sign.Name).toBe("Virgo")
  })
})

describe('House cusp calculation', () => {
  test('Equal House', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'equal house'}).HouseCusps.map(c => c.DecimalDegrees)).toEqual([169.4304, 199.4304, 229.4304, 259.4304, 289.4304, 319.4304, 349.4304, 19.4304, 49.4304, 79.4304, 109.4304, 139.4304,])
  })

  test('Koch', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'koch'}).HouseCusps.map(c => c.DecimalDegrees)).toEqual([ '169.4304', '199.3303', '228.7571', '258.4576', '290.4533', '319.8347', '349.4304', '19.3303', '48.7571', '78.4576', '110.4533', '139.8347' ])
  })

  test('Placidus', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'placidus'}).HouseCusps.map(c => c.DecimalDegrees)).toEqual(["169.4304","195.8759","226.0562","258.4576","290.9246","321.6638","349.4304","15.8759","46.0562","78.4576","110.9246","141.6638"])
  })

  test('Regiomontanus', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'regiomontanus'}).HouseCusps.map(c => c.DecimalDegrees)).toEqual([ '169.4304', '195.1442', '224.3037', '258.4576', '293.2347', '323.3454', '349.4304', '15.1442', '44.3037', '78.4576', '113.2347', '143.3454' ])
  })

  test('Topocentric', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'topocentric'}).HouseCusps.map(c => c.DecimalDegrees)).toEqual(["169.4304","195.8759","226.0562","258.4576","290.9246","321.6638","349.4304","15.8759","46.0562","78.4576","110.9246","141.6638"])
  })

  test('Whole sign', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'whole sign'}).HouseCusps.map(c => c.DecimalDegrees)).toEqual([150.00, 180.00, 210.00, 240.00, 270.00, 300.00, 330.00, 0.00, 30.00, 60.00, 90.00, 120.00])
  })
})

describe('SunSign', () => {
  const novOrigin = new Origin({
    year: 2019,
    month: 10,
    date: 10,
    hour: 0,
    latitude: 0,
    longitude: 0
  })

  const cuspStart = new Origin({
    year: 2019,
    month: 8,
    date: 23,
    hour: 0,
    latitude: 0,
    longitude: 0
  })

  const cuspEnd = new Origin({
    year: 2019,
    month: 8,
    date: 22,
    hour: 0,
    latitude: 0,
    longitude: 0
  })

  const decOrigin = new Origin({
    year: 2019,
    month: 11,
    date: 31,
    hour: 0,
    latitude: 0,
    longitude: 0
  })

  describe('Tropical Zodiac', () => {
    test('Get sign for Nov. 10', () => {
      expect(new Horoscope({origin: novOrigin, zodiac: "tropical"}).SunSign.Name).toBe('Scorpio')
    })

    test('Get sign for cusp start', () => {
      expect(new Horoscope({origin: cuspStart, zodiac: "tropical"}).SunSign.Name).toBe('Libra')
    })

    test('Get sign for cusp end', () => {
      expect(new Horoscope({origin: cuspEnd, zodiac: "tropical"}).SunSign.Name).toBe('Virgo')
    })

  })

  describe('Tropical Zodiac SunSign', () => {
    test('Get sign for Dec. 31', () => {
      expect(new Horoscope({origin: decOrigin, zodiac: "tropical"}).SunSign.Name).toBe('Capricorn')
    })
  })

  describe('Sidereal Zodiac SunSign', () => {
    test('Get sign for Nov. 10', () => {
      expect(new Horoscope({origin: novOrigin, zodiac: "sidereal"}).SunSign.Name).toBe('Libra')
    })
  })

  describe('Astronomical Zodiac SunSign', () => {
    test('Get sign for Nov. 10', () => {
      expect(new Horoscope({origin: novOrigin, zodiac: "astronomical"}).SunSign.Name).toBe('Libra')
    })
  })
})

describe('ZodiacCusps', () => {
  // describe('tropical', () => {
  //   test('origin 1', () => {
  //     expect(new Horoscope({origin: defaultOrigin, zodiac: 'tropical'}).ZodiacCusps).toEqual([169.4304,139.4304,109.4304,79.4304,49.4304,19.4304,349.4304,319.4304,289.4304,259.4304,229.4304,199.4304,])
  //   })
  // })

  // describe('sidereal', () => {
  //   test('origin 1', () => {
  //     expect(new Horoscope({origin: defaultOrigin, zodiac: 'sidereal'}).ZodiacCusps).toEqual([ 145.3304,115.3304,85.3304,55.3304,25.3304,355.3304,325.3304,295.3304,265.3304,235.3304,205.3304,175.3304,])
  //   })
  // })

  // describe('astronomical', () => {
  //   test('origin 1', () => {
  //     expect(new Horoscope({origin: defaultOrigin, zodiac: 'astronomical'}).ZodiacCusps).toEqual([ 145.3304,115.3304,85.3304,55.3304,25.3304,355.3304,325.3304,295.3304,265.3304,235.3304,205.3304,175.3304,])
  //   })
  // })
})

describe('CelestialBodies', () => {
  // describe('tropical', () => {
  //   test('origin 1', () => {
  //     expect(new Horoscope({origin: defaultOrigin, zodiac: 'tropical'}).CelestialBodies).toEqual([169.4304,139.4304,109.4304,79.4304,49.4304,19.4304,349.4304,319.4304,289.4304,259.4304,229.4304,199.4304,])
  //   })
  // })

  // describe('sidereal', () => {
  //   test('origin 1', () => {
  //     expect(new Horoscope({origin: defaultOrigin, zodiac: 'sidereal'}).CelestialBodies).toEqual([ 145.3304,115.3304,85.3304,55.3304,25.3304,355.3304,325.3304,295.3304,265.3304,235.3304,205.3304,175.3304,])
  //   })
  // })
})
