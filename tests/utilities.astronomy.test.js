import { getAscendant } from '../src/utilities/astronomy'

describe('getAscendant', () => {
  it ('returns correct value 0 ', () => { // from astronomical algorithims pg 99 ex 14.a
    const latitude = 51.0
    const localSiderealTime = 75.0
    const obliquityEcliptic = 23.44
    expect(getAscendant({latitude, localSiderealTime, obliquityEcliptic})).toEqual(169.35830480234677)
  })

  it ('returns correct value 1 ', () => {
    const latitude = 40.72
    const localSiderealTime = 25.96
    expect(getAscendant({latitude, localSiderealTime})).toEqual(129.6067302512891)
  })

  it ('returns correct value 2', () => {
    const latitude = 42.37
    const localSiderealTime = 90.81
    expect(getAscendant({latitude, localSiderealTime})).toEqual(180.6326622914694)
  })

  it ('returns correct value 3', () => {
    const latitude = -33.47
    const localSiderealTime = 121.88288750336505
    expect(getAscendant({latitude, localSiderealTime})).toEqual(225.66189024232585)
  })
})
