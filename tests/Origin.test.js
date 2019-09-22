import Origin from '../src/Origin'


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

  expect(origin.utcTime.years()).toBe(2019)
  expect(origin.utcTime.months()).toBe(6)
  expect(origin.utcTime.dates()).toBe(20)
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

  expect(origin.utcTime.years()).toBe(2019)
  expect(origin.utcTime.months()).toBe(6)
  expect(origin.utcTime.dates()).toBe(20)
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

  expect(origin.utcTime.years()).toBe(2019)
  expect(origin.utcTime.months()).toBe(6)
  expect(origin.utcTime.dates()).toBe(20)
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

  expect(origin.utcTime.years()).toBe(2019)
  expect(origin.utcTime.months()).toBe(6)
  expect(origin.utcTime.dates()).toBe(20)
  expect(origin.utcTime.hours()).toBe(0)
  expect(origin.utcTime.minutes()).toBe(10)
  expect(origin.julianDate).toBe(2458684.5069444445)
  expect(origin.localSiderealTime).toBe(91.20674961153418)
})
