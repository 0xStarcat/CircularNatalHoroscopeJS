import Origin from '../src/Origin';
import Horoscope from '../src/Horoscope';

const defaultOrigin = new Origin({
  year: 2019, // July 20, 2019 10:10am local time
  month: 6,
  date: 20,
  hour: 10,
  minute: 10,
  latitude: 34.052235, // los angeles
  longitude: -118.243683,
});

describe('Construction Validation & Errors', () => {
  describe('house system validation', () => {
    const origin = defaultOrigin;

    test('Passing in an invalid houseSystem string', () => {
      expect(() => new Horoscope({ origin, houseSystem: 'TEST' })).toThrowError(/The "TEST" house system is not included. Please choose from the following list:/);
    });

    test('Passing in a valid houseSystem string', () => {
      expect(new Horoscope({ origin, houseSystem: 'Placidus' })._houseSystem).toBe('placidus');
    });

    test('invalid zodiac', () => {
      expect(() => new Horoscope({ origin, zodiac: 'TEST' })).toThrowError('The "test" zodiac is not included. Please choose from the following list: sidereal, tropical.');
    });
  });

  describe('custom orb validation', () => {
    const origin = defaultOrigin;

    test('Passing in an invalid houseSystem string', () => {
      expect(() => new Horoscope({
        origin,
        aspectTypes: ['conjunction'],
        aspectPoints: ['sun'],
        aspectWithPoints: ['moon'],
        customOrbs: { conjunction: '-1' },
      })).toThrowError(/Custom orb \"conjunction\" must be > 0./);
    });

    test('Passing in an invalid houseSystem string', () => {
      expect(() => new Horoscope({
        origin,
        aspectTypes: ['conjunction'],
        aspectPoints: ['sun'],
        aspectWithPoints: ['moon'],
        customOrbs: { conjunction: '13' },
      })).toThrowError(/Custom orb \"conjunction\" must be <= 12./);
    });
  });
});

describe('Midheaven & ascendant calculations', () => {
  test('Northern Hemisphere Horoscope calculations', () => {
    const origin = defaultOrigin;

    const horoscope = new Horoscope({
      origin,
    });

    expect(horoscope.Midheaven.label).toBe('Midheaven');
    expect(horoscope.Midheaven.ChartPosition.Ecliptic.DecimalDegrees).toBe(78.4576);
    expect(horoscope.Midheaven.ChartPosition.Ecliptic.ArcDegreesFormatted).toBe('78° 27\' 27\'\'');
    expect(horoscope.Midheaven.Sign.label).toBe('Gemini');
    expect(horoscope.Ascendant.label).toBe('Ascendant');
    expect(horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees).toBe(169.4304);
    expect(horoscope.Ascendant.ChartPosition.Ecliptic.ArcDegreesFormatted).toBe('169° 25\' 49\'\'');
    expect(horoscope.Ascendant.Sign.label).toBe('Virgo');
  });

  test('Sidereal Northern Hemisphere Horoscope calculations', () => {
    const origin = defaultOrigin;

    const horoscope = new Horoscope({
      origin,
      zodiac: 'sidereal',
    });

    expect(horoscope.Midheaven.ChartPosition.Ecliptic.DecimalDegrees).toBe(54.3576);
    expect(horoscope.Midheaven.ChartPosition.Ecliptic.ArcDegreesFormatted).toBe('54° 21\' 27\'\'');
    expect(horoscope.Midheaven.Sign.label).toBe('Taurus');
    expect(horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees).toBe(145.3304);
    expect(horoscope.Ascendant.ChartPosition.Ecliptic.ArcDegreesFormatted).toBe('145° 19\' 49\'\'');
    expect(horoscope.Ascendant.Sign.label).toBe('Leo');
  });

  test('Southern Hemisphere Horoscope calculations', () => {
    const origin = new Origin({
      year: 2019, // July 20, 2019 10:10am local time
      month: 6,
      date: 20,
      hour: 10,
      minute: 10,
      latitude: -34.603722, // Buenos Aires, Argentina
      longitude: -58.381592,
    });

    const horoscope = new Horoscope({
      origin,
    });

    expect(horoscope.Midheaven.ChartPosition.Ecliptic.DecimalDegrees).toBe(78.1782);
    expect(horoscope.Midheaven.ChartPosition.Ecliptic.ArcDegreesFormatted).toBe('78° 10\' 42\'\'');
    expect(horoscope.Midheaven.Sign.label).toBe('Gemini');
    expect(horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees).toBe(160.2684);
    expect(horoscope.Ascendant.ChartPosition.Ecliptic.ArcDegreesFormatted).toBe('160° 16\' 6\'\'');
    expect(horoscope.Ascendant.Sign.label).toBe('Virgo');
  });
});

describe('Houses', () => {
  // TODO - each house system - expect w Ecliptic Decimal Degrees too
  test('Equal House', () => {
    expect(new Horoscope({ origin: defaultOrigin, houseSystem: 'equal-house' }).Houses.map((c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees)).toEqual([169.4304, 199.4304, 229.4304, 259.4304, 289.4304, 319.4304, 349.4304, 19.4304, 49.4304, 79.4304, 109.4304, 139.4304]);
  });

  test('Koch', () => {
    expect(new Horoscope({ origin: defaultOrigin, houseSystem: 'koch' }).Houses.map((c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees)).toEqual([169.4304, 199.3303, 228.7571, 258.4576, 290.4533, 319.8347, 349.4304, 19.3303, 48.7571, 78.4576, 110.4533, 139.8347]);
  });

  test('Placidus', () => {
    expect(new Horoscope({ origin: defaultOrigin, houseSystem: 'placidus', zodiac: 'tropical' }).Houses.map((c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees)).toEqual([169.4304, 195.8759, 226.0562, 258.4576, 290.9246, 321.6638, 349.4304, 15.8759, 46.0562, 78.4576, 110.9246, 141.6638]);

    expect(new Horoscope({ origin: defaultOrigin, houseSystem: 'placidus', zodiac: 'sidereal' }).Houses.map((c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees)).toEqual([
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
      120.596,
    ]);
  });

  test('Campanus - northern hemisphere', () => {
    expect(
      new Horoscope({
        origin: defaultOrigin,
        houseSystem: 'campanus',
      }).Houses.map(
        (c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees,
      ),
    ).toEqual([
      169.4304,
      199.5548,
      229.0692,
      258.4576,
      288.3216,
      318.8087,
      349.4304,
      19.5548,
      49.0692,
      78.4576,
      108.3216,
      138.8087,
    ]);
  });

  test('Campanus - southern hemisphere', () => {
    const southernOrigin = new Origin({
      month: 6, date: 20, year: 2019, hour: 10, minute: 10, latitude: -31.95, longitude: 115.866667,
    });

    expect(
      new Horoscope({
        origin: southernOrigin,
        houseSystem: 'campanus',
      }).Houses.map(
        (c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees,
      ),
    ).toEqual([
      173.9506,
      220.5243,
      247.8631,
      266.2792,
      284.2412,
      309.7374,
      353.9506,
      40.5243,
      67.8631,
      86.2792,
      104.2412,
      129.7374,
    ]);
  });

  test('Regiomontanus', () => {
    expect(
      new Horoscope({
        origin: defaultOrigin,
        houseSystem: 'regiomontanus',
      }).Houses.map(
        (c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees,
      ),
    ).toEqual([
      169.4304,
      195.1442,
      224.3037,
      258.4576,
      293.2347,
      323.3454,
      349.4304,
      15.1442,
      44.3037,
      78.4576,
      113.2347,
      143.3454,
    ]);
  });

  test('Topocentric', () => {
    expect(
      new Horoscope({
        origin: defaultOrigin,
        houseSystem: 'topocentric',
      }).Houses.map(
        (c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees,
      ),
    ).toEqual([
      169.4304,
      195.8759,
      226.0562,
      258.4576,
      290.9246,
      321.6638,
      349.4304,
      15.8759,
      46.0562,
      78.4576,
      110.9246,
      141.6638,
    ]);
  });

  test('Whole sign', () => {
    expect(
      new Horoscope({
        origin: defaultOrigin,
        houseSystem: 'whole-sign',
        zodiac: 'tropical',
      }).Houses.map(
        (c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees,
      ),
    ).toEqual([
      150.0,
      180.0,
      210.0,
      240.0,
      270.0,
      300.0,
      330.0,
      0.0,
      30.0,
      60.0,
      90.0,
      120.0,
    ]);

    expect(
      new Horoscope({
        origin: defaultOrigin,
        houseSystem: 'whole-sign',
        zodiac: 'sidereal',
      }).Houses.map(
        (c) => c.ChartPosition.StartPosition.Ecliptic.DecimalDegrees,
      ),
    ).toEqual([
      120.0,
      150.0,
      180.0,
      210.0,
      240.0,
      270.0,
      300.0,
      330.0,
      0.0,
      30.0,
      60.0,
      90.0,
    ]);
  });
});

describe('SunSign', () => {
  const janOrigin = new Origin({
    year: 2019,
    month: 0,
    date: 10,
    hour: 0,
    latitude: 0,
    longitude: 0,
  });

  const novOrigin = new Origin({
    year: 2019,
    month: 10,
    date: 10,
    hour: 0,
    latitude: 0,
    longitude: 0,
  });

  const cuspStart = new Origin({
    year: 2019,
    month: 8,
    date: 23,
    hour: 0,
    latitude: 0,
    longitude: 0,
  });

  const cuspEnd = new Origin({
    year: 2019,
    month: 8,
    date: 22,
    hour: 0,
    latitude: 0,
    longitude: 0,
  });

  const decOrigin = new Origin({
    year: 2019,
    month: 11,
    date: 31,
    hour: 0,
    latitude: 0,
    longitude: 0,
  });

  describe('Tropical Zodiac', () => {
    test('Get sign for Jan. 10', () => {
      expect(
        new Horoscope({ origin: janOrigin, zodiac: 'tropical' }).SunSign.label,
      ).toBe('Capricorn');
    });

    test('Get sign for Nov. 10', () => {
      expect(
        new Horoscope({ origin: novOrigin, zodiac: 'tropical' }).SunSign.label,
      ).toBe('Scorpio');
    });

    test('Get sign for cusp start', () => {
      expect(
        new Horoscope({ origin: cuspStart, zodiac: 'tropical' }).SunSign.label,
      ).toBe('Libra');
    });

    test('Get sign for cusp end', () => {
      expect(
        new Horoscope({ origin: cuspEnd, zodiac: 'tropical' }).SunSign.label,
      ).toBe('Virgo');
    });
  });

  describe('Tropical Zodiac SunSign', () => {
    test('Get sign for Dec. 31', () => {
      expect(
        new Horoscope({ origin: decOrigin, zodiac: 'tropical' }).SunSign.label,
      ).toBe('Capricorn');
    });
  });

  describe('Sidereal Zodiac SunSign', () => {
    test('Get sign for Nov. 10', () => {
      expect(
        new Horoscope({ origin: novOrigin, zodiac: 'sidereal' }).SunSign.label,
      ).toBe('Libra');
    });
  });

  // describe('Astronomical Zodiac SunSign', () => {
  //   test('Get sign for Nov. 10', () => {
  //     expect(new Horoscope({origin: novOrigin, zodiac: "astronomical"}).SunSign.label).toBe('Libra')
  //   })
  // })
});

describe('ZodiacCusps', () => {
  // TODO - each zodiac system - expect w Ecliptic Decimal Degrees too

  describe('tropical', () => {
    test('origin 1', () => {
      const horoscope = new Horoscope({
        origin: defaultOrigin,
        zodiac: 'tropical',
      });
      expect(
        horoscope.ZodiacCusps.map((c) => c.ChartPosition.Horizon.DecimalDegrees),
      ).toEqual([
        169.4304,
        139.4304,
        109.4304,
        79.4304,
        49.4304,
        19.4304,
        349.4304,
        319.4304,
        289.4304,
        259.4304,
        229.4304,
        199.4304,
      ]);

      expect(
        horoscope.ZodiacCusps.map(
          (c) => c.ChartPosition.Ecliptic.DecimalDegrees,
        ),
      ).toEqual([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);
    });
  });

  describe('sidereal', () => {
    test('origin 1', () => {
      const horoscope = new Horoscope({
        origin: defaultOrigin,
        zodiac: 'sidereal',
      });

      expect(
        horoscope.ZodiacCusps.map((c) => c.ChartPosition.Horizon.DecimalDegrees),
      ).toEqual([
        145.3304,
        115.3304,
        85.3304,
        55.3304,
        25.3304,
        355.3304,
        325.3304,
        295.3304,
        265.3304,
        235.3304,
        205.3304,
        175.3304,
      ]);

      expect(
        horoscope.ZodiacCusps.map(
          (c) => c.ChartPosition.Ecliptic.DecimalDegrees,
        ),
      ).toEqual([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);
    });
  });

  // describe('astronomical', () => {
  //   test('origin 1', () => {
  //     expect(new Horoscope({origin: defaultOrigin, zodiac: 'astronomical'}).ZodiacCusps).toEqual([ 145.3304,115.3304,85.3304,55.3304,25.3304,355.3304,325.3304,295.3304,265.3304,235.3304,205.3304,175.3304,])
  //   })
  // })
});

describe('CelestialBodies', () => {
  describe('tropical', () => {
    test('origin 1', () => {
      const horoscope = new Horoscope({
        origin: defaultOrigin,
        zodiac: 'tropical',
      });
      expect(
        horoscope.CelestialBodies.all.map(
          (b) => b.ChartPosition.Ecliptic.DecimalDegrees,
        ),
      ).toEqual([
        117.706,
        339.8001,
        119.0326,
        110.9417,
        131.9067,
        255.2349,
        286.4133,
        36.4104,
        348.5027,
        291.7448,
        5.9965,
        1.7714,
      ]);

      expect(
        horoscope.CelestialBodies.all.map(
          (b) => b.ChartPosition.Horizon.DecimalDegrees,
        ),
      ).toEqual([
        51.7244,
        189.6303,
        50.3978,
        58.4887,
        37.5237,
        274.1955,
        243.0171,
        133.02,
        180.9277,
        237.6856,
        163.4339,
        167.659,
      ]);
    });
  });

  describe('sidereal', () => {
    // same as tropical
    test('origin 1', () => {
      const horoscope = new Horoscope({
        origin: defaultOrigin,
        zodiac: 'sidereal',
      });
      expect(
        horoscope.CelestialBodies.all.map(
          (b) => b.ChartPosition.Ecliptic.DecimalDegrees,
        ),
      ).toEqual([
        93.606,
        315.7001,
        94.9326,
        86.8417,
        107.8067,
        231.1349,
        262.3133,
        12.3104,
        324.4027,
        267.6448,
        341.8965,
        337.6714,
      ]);

      expect(
        horoscope.CelestialBodies.all.map(
          (b) => b.ChartPosition.Horizon.DecimalDegrees,
        ),
      ).toEqual([
        51.7244,
        189.6303,
        50.3978,
        58.4887,
        37.5237,
        274.1955,
        243.0171,
        133.02,
        180.9277,
        237.6856,
        163.4339,
        167.659,
      ]);
    });
  });

  describe('tropical single planet', () => {
    const horoscope = new Horoscope({
      origin: defaultOrigin,
      zodiac: 'tropical',
    });
    expect(horoscope.CelestialBodies.all[0].House.id).toEqual(11);
  });

  describe('sidereal single planet', () => {
    const horoscope = new Horoscope({
      origin: defaultOrigin,
      zodiac: 'sidereal',
    });
    expect(horoscope.CelestialBodies.all[0].House.id).toEqual(11);
  });

  describe('CelestialPoints', () => {
    describe('tropical', () => {
      const horoscope = new Horoscope({
        origin: defaultOrigin,
        zodiac: 'tropical',
      });

      it('returns north node', () => {
        expect(
          horoscope.CelestialPoints.northnode.ChartPosition.Ecliptic
            .DecimalDegrees,
        ).toEqual(106.9434);
        expect(horoscope.CelestialPoints.northnode.Sign.label).toEqual(
          'Cancer',
        );
        expect(horoscope.CelestialPoints.northnode.House.id).toEqual(10);
      });

      it('returns south node', () => {
        expect(
          horoscope.CelestialPoints.southnode.ChartPosition.Ecliptic
            .DecimalDegrees,
        ).toEqual(286.9434);
        expect(horoscope.CelestialPoints.southnode.Sign.label).toEqual(
          'Capricorn',
        );
        expect(horoscope.CelestialPoints.southnode.House.id).toEqual(4);
      });

      it('returns lilith', () => {
        expect(
          horoscope.CelestialPoints.lilith.ChartPosition.Ecliptic.DecimalDegrees,
        ).toEqual(338.798);
        expect(horoscope.CelestialPoints.lilith.Sign.label).toEqual('Pisces');
        expect(horoscope.CelestialPoints.lilith.House.id).toEqual(6);
      });
    });
  });

  describe('Aspects', () => {
    it('returns all aspects', () => {
      const horoscope = new Horoscope({
        origin: defaultOrigin,
        zodiac: 'tropical',
        aspectTypes: 'all',
        aspectPoints: ['bodies', 'points', 'angles'],
        aspectWithPoints: ['bodies', 'points', 'angles'],
      });
      expect(horoscope.Aspects.all).toHaveLength(53);
    });

    it('returns all major aspects', () => {
      const horoscope = new Horoscope({
        origin: defaultOrigin,
        zodiac: 'tropical',
        aspectTypes: 'major',
        aspectPoints: ['bodies', 'points', 'angles'],
        aspectWithPoints: ['bodies', 'points', 'angles'],
      });
      expect(horoscope.Aspects.all).toHaveLength(41);
    });

    it('returns all minor aspects', () => {
      const horoscope = new Horoscope({
        origin: defaultOrigin,
        zodiac: 'tropical',
        aspectTypes: 'minor',
        aspectPoints: ['bodies', 'points', 'angles'],
        aspectWithPoints: ['bodies', 'points', 'angles'],
      });
      expect(horoscope.Aspects.all).toHaveLength(12);
    });
  });
});
