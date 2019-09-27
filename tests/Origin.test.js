import Origin from '../src/Origin'

describe('Constructor validations / errors', () => {
  test('invalid year', () => {
    expect(() => new Origin({year: 0})).toThrowError("The year: \"0\" - must be an integer and > 0 (C.E.)")
  })

  test('invalid month', () => {
    expect(() => new Origin({year: 1, month: 12})).toThrowError("The month: \"12\" - must be an integer and between 0 - 11. (0 = January, 11 = December)")
  })

  test('invalid date', () => {
    expect(() => new Origin({year: 1, month: 1, date: 32})).toThrowError("The date: \"32 must be between 1 - 31")
  })

  test('invalid hour', () => {
    expect(() => new Origin({year: 1, month: 1, date: 31, hour: 24})).toThrowError("The hour: \"24\" - must be an integer and between 0 - 23. (0 = midnight 00:00, 23 = 11pm (23:00))")
  })

  test('invalid minute', () => {
    expect(() => new Origin({year: 1, month: 1, date: 31, hour: 23, minute: 60})).toThrowError("The minute: \"60\" - must be an integer and between 0 - 59")
  })

  test('invalid latitude', () => {
    expect(() => new Origin({year: 1, month: 1, date: 31, hour: 23, minute: 59, latitude: -90.01})).toThrowError("The latitude: \"-90.01\" - must be an float and between -90.00 to 90.00")
  })

  test('invalid longitude', () => {
    expect(() => new Origin({year: 1, month: 1, date: 31, hour: 23, minute: 59, latitude: -90, longitude: -181.01})).toThrowError("The longitude: \"-181.01\" - must be an float and between -180.00 to 180.00")
  })
})

describe('Date/Time/Location calculations', () => {
  test('Northern Western Hemisphere, present', () => {
    const origin = new Origin({
      year: 2019, // July 20, 2019 10:10am local time
      month: 6,
      date: 20,
      hour: 10,
      minute: 10,
      latitude: 34.052235, // los angeles
      longitude: -118.243683
    })

    expect(origin.utcTime.year()).toBe(2019)
    expect(origin.utcTime.month()).toBe(6)
    expect(origin.utcTime.date()).toBe(20)
    expect(origin.utcTime.hours()).toBe(17)
    expect(origin.utcTime.minutes()).toBe(10)
    expect(origin.julianDate).toBe(2458685.215277778)
    expect(origin.localSiderealTime).toBe(77.45133355539292)
  })

  test('Northern Eastern Hemisphere, present', () => {
    const origin = new Origin({
      year: 2019, // July 20, 2019 10:10am local time
      month: 6,
      date: 20,
      hour: 10,
      minute: 10,
      latitude: 48.864716, // Paris, France
      longitude: 2.349014
    })

    expect(origin.utcTime.year()).toBe(2019)
    expect(origin.utcTime.month()).toBe(6)
    expect(origin.utcTime.date()).toBe(20)
    expect(origin.utcTime.hours()).toBe(8)
    expect(origin.utcTime.minutes()).toBe(10)
    expect(origin.julianDate).toBe(2458684.840277778)
    expect(origin.localSiderealTime).toBe(62.67441279115155)
  })

  test('Southern Western Hemisphere, present', () => {
    const origin = new Origin({
      year: 2019, // July 20, 2019 10:10am local time
      month: 6,
      date: 20,
      hour: 10,
      minute: 10,
      latitude: -34.603722, // Buenos Aires, Argentina
      longitude: -58.381592
    })

    expect(origin.utcTime.year()).toBe(2019)
    expect(origin.utcTime.month()).toBe(6)
    expect(origin.utcTime.date()).toBe(20)
    expect(origin.utcTime.hours()).toBe(13)
    expect(origin.utcTime.minutes()).toBe(10)
    expect(origin.julianDate).toBe(2458685.048611111)
    expect(origin.localSiderealTime).toBe(77.14914988121018)
  })

  test('Southern Eastern Hemisphere, present', () => {
    const origin = new Origin({
      year: 2019, // July 20, 2019 10:10am local time
      month: 6,
      date: 20,
      hour: 10,
      minute: 10,
      latitude: -33.865143, // Sydney, Australia
      longitude: 151.209900
    })

    expect(origin.utcTime.year()).toBe(2019)
    expect(origin.utcTime.month()).toBe(6)
    expect(origin.utcTime.date()).toBe(20)
    expect(origin.utcTime.hours()).toBe(0)
    expect(origin.utcTime.minutes()).toBe(10)
    expect(origin.julianDate).toBe(2458684.5069444445)
    expect(origin.localSiderealTime).toBe(91.20674961153418)
  })
})
