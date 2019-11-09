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

    test('Passing in a valid houseSystem string', () => {
      expect(new Horoscope({origin: origin, houseSystem: "Placidus"})._houseSystem).toBe('placidus')
    })

    test('invalid zodiac', () => {
      expect(() => new Horoscope({origin: origin, zodiac: "TEST"})).toThrowError("The \"test\" zodiac is not included. Please choose from the following list: sidereal, tropical.")
    })
  })
})

describe('Midheaven & ascendant calculations', () => {
  test('Northern Hemisphere Horoscope calculations', () => {
    const origin = defaultOrigin

    const horoscope = new Horoscope({
      origin
    })

    expect(horoscope.Midheaven.ChartPosition.Zodiac.DecimalDegrees).toBe(78.4576)
    expect(horoscope.Midheaven.ChartPosition.Zodiac.ArcDegreesFormatted).toBe("78° 27' 27''")
    expect(horoscope.Midheaven.Sign.Name).toBe("Gemini")
    expect(horoscope.Ascendant.ChartPosition.Zodiac.DecimalDegrees).toBe(169.4304)
    expect(horoscope.Ascendant.ChartPosition.Zodiac.ArcDegreesFormatted).toBe("169° 25' 49''")
    expect(horoscope.Ascendant.Sign.Name).toBe("Virgo")
  })

  test('Sidereal Northern Hemisphere Horoscope calculations', () => {
    const origin = defaultOrigin

    const horoscope = new Horoscope({
      origin,
      zodiac: 'sidereal'
    })

    expect(horoscope.Midheaven.ChartPosition.Zodiac.DecimalDegrees).toBe(54.3576)
    expect(horoscope.Midheaven.ChartPosition.Zodiac.ArcDegreesFormatted).toBe("54° 21' 27''")
    expect(horoscope.Midheaven.Sign.Name).toBe("Taurus")
    expect(horoscope.Ascendant.ChartPosition.Zodiac.DecimalDegrees).toBe(145.3304)
    expect(horoscope.Ascendant.ChartPosition.Zodiac.ArcDegreesFormatted).toBe("145° 19' 49''")
    expect(horoscope.Ascendant.Sign.Name).toBe("Leo")
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

    expect(horoscope.Midheaven.ChartPosition.Zodiac.DecimalDegrees).toBe(78.1782)
    expect(horoscope.Midheaven.ChartPosition.Zodiac.ArcDegreesFormatted).toBe("78° 10' 42''")
    expect(horoscope.Midheaven.Sign.Name).toBe("Gemini")
    expect(horoscope.Ascendant.ChartPosition.Zodiac.DecimalDegrees).toBe(160.2684)
    expect(horoscope.Ascendant.ChartPosition.Zodiac.ArcDegreesFormatted).toBe("160° 16' 6''")
    expect(horoscope.Ascendant.Sign.Name).toBe("Virgo")
  })
})

describe('Houses', () => {
  // TODO - each house system - expect w Ecliptic Decimal Degrees too
  test('Equal House', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'equal house'}).Houses.map(c => c.ChartPosition.StartPosition.Zodiac.DecimalDegrees)).toEqual([169.4304, 199.4304, 229.4304, 259.4304, 289.4304, 319.4304, 349.4304, 19.4304, 49.4304, 79.4304, 109.4304, 139.4304,])
  })

  test('Koch', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'koch'}).Houses.map(c => c.ChartPosition.StartPosition.Zodiac.DecimalDegrees)).toEqual([ 169.4304, 199.3303, 228.7571, 258.4576, 290.4533, 319.8347, 349.4304, 19.3303, 48.7571, 78.4576, 110.4533, 139.8347 ])
  })

  test('Placidus', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'placidus', zodiac: 'tropical'}).Houses.map(c => c.ChartPosition.StartPosition.Zodiac.DecimalDegrees)).toEqual([169.4304,195.8759,226.0562,258.4576,290.9246,321.6638,349.4304,15.8759,46.0562,78.4576,110.9246,141.6638])

    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'placidus', zodiac: 'sidereal'}).Houses.map(c => c.ChartPosition.StartPosition.Zodiac.DecimalDegrees)).toEqual([
      145.3304,
      173.9397,
      203.0406,
      234.3576,
      269.0409,
      300.596,
      325.3304,
      353.9397,
      23.0406,
      54.3576,
      89.0409,
      120.596 ])
  })

  test('Regiomontanus', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'regiomontanus'}).Houses.map(c => c.ChartPosition.StartPosition.Zodiac.DecimalDegrees)).toEqual([ 169.4304, 195.1442, 224.3037, 258.4576, 293.2347, 323.3454, 349.4304, 15.1442, 44.3037, 78.4576, 113.2347, 143.3454 ])
  })

  test('Topocentric', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'topocentric'}).Houses.map(c => c.ChartPosition.StartPosition.Zodiac.DecimalDegrees)).toEqual([169.4304,195.8759,226.0562,258.4576,290.9246,321.6638,349.4304,15.8759,46.0562,78.4576,110.9246,141.6638])
  })

  test('Whole sign', () => {
    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'whole sign', zodiac: 'tropical'}).Houses.map(c => c.ChartPosition.StartPosition.Zodiac.DecimalDegrees)).toEqual([150.00, 180.00, 210.00, 240.00, 270.00, 300.00, 330.00, 0.00, 30.00, 60.00, 90.00, 120.00])

    expect(new Horoscope({origin: defaultOrigin, houseSystem: 'whole sign', zodiac: 'sidereal'}).Houses.map(c => c.ChartPosition.StartPosition.Zodiac.DecimalDegrees)).toEqual([120.00, 150.00, 180.00, 210.00, 240.00, 270.00, 300.00, 330.00, 0.00, 30.00, 60.00, 90.00])
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

  // describe('Astronomical Zodiac SunSign', () => {
  //   test('Get sign for Nov. 10', () => {
  //     expect(new Horoscope({origin: novOrigin, zodiac: "astronomical"}).SunSign.Name).toBe('Libra')
  //   })
  // })
})

describe('ZodiacCusps', () => {
  // TODO - each zodiac system - expect w Ecliptic Decimal Degrees too

  describe('tropical', () => {
    test('origin 1', () => {
      const horoscope = new Horoscope({origin: defaultOrigin, zodiac: 'tropical'})
      expect(horoscope.ZodiacCusps.map(c => c.ChartPosition.Ecliptic.DecimalDegrees)).toEqual([169.4304,139.4304,109.4304,79.4304,49.4304,19.4304,349.4304,319.4304,289.4304,259.4304,229.4304,199.4304,])

      expect(horoscope.ZodiacCusps.map(c => c.ChartPosition.Zodiac.DecimalDegrees)).toEqual([ 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330 ])

    })
  })

  describe('sidereal', () => {
    test('origin 1', () => {
      const horoscope = new Horoscope({origin: defaultOrigin, zodiac: 'sidereal'})

      expect(horoscope.ZodiacCusps.map(c => c.ChartPosition.Ecliptic.DecimalDegrees)).toEqual([ 145.3304,115.3304,85.3304,55.3304,25.3304,355.3304,325.3304,295.3304,265.3304,235.3304,205.3304,175.3304,])

      expect(horoscope.ZodiacCusps.map(c => c.ChartPosition.Zodiac.DecimalDegrees)).toEqual([ 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330 ])
    })
  })

  // describe('astronomical', () => {
  //   test('origin 1', () => {
  //     expect(new Horoscope({origin: defaultOrigin, zodiac: 'astronomical'}).ZodiacCusps).toEqual([ 145.3304,115.3304,85.3304,55.3304,25.3304,355.3304,325.3304,295.3304,265.3304,235.3304,205.3304,175.3304,])
  //   })
  // })
})

describe('CelestialBodies', () => {
  describe('tropical', () => {
    test('origin 1', () => {
      const horoscope = new Horoscope({origin: defaultOrigin, zodiac: 'tropical'})
      expect(horoscope.CelestialBodies.map(b => b.ChartPosition.Zodiac.DecimalDegrees)).toEqual(
        [ 117.4277,
        336.3438,
        119.2327,
        110.5833,
        131.7216,
        255.2541,
        286.4342,
        36.405,
        348.507,
        291.7519,
        5.9994,
        1.7714 ])

      expect(horoscope.CelestialBodies.map(b => b.ChartPosition.Ecliptic.DecimalDegrees)).toEqual(
        [ 52.0027,
          193.0866,
          50.1977,
          58.8471,
          37.7088,
          274.1763,
          242.9962,
          133.0254,
          180.9234,
          237.6785,
          163.431,
          167.659 ])
    })
  })

  describe('sidereal', () => { // same as tropical
    test('origin 1', () => {
      const horoscope = new Horoscope({origin: defaultOrigin, zodiac: 'sidereal'})
      expect(horoscope.CelestialBodies.map(b => b.ChartPosition.Zodiac.DecimalDegrees)).toEqual(
        [ 93.3277,
        312.2438,
        95.1327,
        86.4833,
        107.6216,
        231.1541,
        262.3342,
        12.305,
        324.407,
        267.6519,
        341.8994,
        337.6714 ])

      expect(horoscope.CelestialBodies.map(b => b.ChartPosition.Ecliptic.DecimalDegrees)).toEqual(
        [ 52.0027,
          193.0866,
          50.1977,
          58.8471,
          37.7088,
          274.1763,
          242.9962,
          133.0254,
          180.9234,
          237.6785,
          163.431,
          167.659 ])
    })
  })

  describe('tropical single planet', () => {
    const horoscope = new Horoscope({origin: defaultOrigin, zodiac: 'tropical'})
    expect(horoscope.CelestialBodies[0].House.Id).toEqual(11)
  })

  describe('sidereal single planet', () => {
    const horoscope = new Horoscope({origin: defaultOrigin, zodiac: 'sidereal'})
    expect(horoscope.CelestialBodies[0].House.Id).toEqual(11)
  })

  describe('CelestialPoints', () => {
    describe('tropical', () => {
      const horoscope = new Horoscope({origin: defaultOrigin, zodiac: 'tropical'})

      it('returns north node', () => {
        expect(horoscope.CelestialPoints.NorthNode.ChartPosition.Zodiac.DecimalDegrees).toEqual(106.9588)
        expect(horoscope.CelestialPoints.NorthNode.Sign.Name).toEqual("Cancer")
        expect(horoscope.CelestialPoints.NorthNode.House.Id).toEqual(10)

      })

      it('returns south node', () => {
        expect(horoscope.CelestialPoints.SouthNode.ChartPosition.Zodiac.DecimalDegrees).toEqual(286.9588)
        expect(horoscope.CelestialPoints.SouthNode.Sign.Name).toEqual("Capricorn")
        expect(horoscope.CelestialPoints.SouthNode.House.Id).toEqual(4)
      })

      it('returns lilith', () => {
        expect(horoscope.CelestialPoints.Lilith.ChartPosition.Zodiac.DecimalDegrees).toEqual(338.7655)
        expect(horoscope.CelestialPoints.Lilith.Sign.Name).toEqual("Pisces")
        expect(horoscope.CelestialPoints.Lilith.House.Id).toEqual(6)
      })
    })
  })
})
