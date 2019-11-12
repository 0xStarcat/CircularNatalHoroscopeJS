import { zodiacPositionToHorizon, getZodiacSign, getSignFromDD, getHouseFromDD, calculateEqualHouseCusps, constructHouses } from '../src/utilities/astrology'

describe('zodiacPositionToHorizon', () => {
  it('returns converted value - 1', () => {
    expect(zodiacPositionToHorizon(100, 100)).toEqual(0)
  })

  it('returns converted value - 2', () => {
    expect(zodiacPositionToHorizon(100, 100)).toEqual(0)
  })
})

describe('getZodiacSign', () => {
  test('getZodiacSign - 1', () => {
    const sign = getZodiacSign({decimalDegrees: 5.6789, zodiac: "tropical"})
    expect(sign.label).toBe("Aries")
  })

  test('getZodiacSign - 2', () => {
    const sign = getZodiacSign({decimalDegrees: 180.6789, zodiac: "tropical"})
    expect(sign.label).toBe("Libra")
  })

  test('getZodiacSign - 3', () => {
    const sign = getZodiacSign({decimalDegrees: 355.6789, zodiac: "tropical"})
    expect(sign.label).toBe("Pisces")
  })
})

describe('getHouseFromDD', () => {
  const cuspsArray = calculateEqualHouseCusps({ascendant: 0, zodiac: 'tropical'})

  const houses = constructHouses(cuspsArray, 0, 'tropical')

  it('returns 1st house', () => {
    expect(getHouseFromDD(houses, 0).id).toEqual(1)
  })

  it('returns 2th house', () => {
    expect(getHouseFromDD(houses, 30).id).toEqual(2)
  })

  it('returns 12th house', () => {
    expect(getHouseFromDD(houses, 350).id).toEqual(12)
  })
})
