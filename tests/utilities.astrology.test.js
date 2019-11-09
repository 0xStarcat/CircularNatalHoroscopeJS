import { getZodiacSign, getSignFromDD, getHouseFromDD, calculateEqualHouseCusps, constructHouses } from '../src/utilities/astrology'

test('getZodiacSign - 1', () => {
  const sign = getZodiacSign({decimalDegrees: 5.6789, zodiac: "tropical"})
  expect(sign.Name).toBe("Aries")
})

test('getZodiacSign - 2', () => {
  const sign = getZodiacSign({decimalDegrees: 180.6789, zodiac: "tropical"})
  expect(sign.Name).toBe("Libra")
})

test('getZodiacSign - 3', () => {
  const sign = getZodiacSign({decimalDegrees: 355.6789, zodiac: "tropical"})
  expect(sign.Name).toBe("Pisces")
})

describe('getHouseFromDD', () => {
  const cuspsArray = calculateEqualHouseCusps({ascendant: 0, zodiac: 'tropical'})

  const houses = constructHouses(cuspsArray, 0)

  it('returns 1st house', () => {
    expect(getHouseFromDD(houses, 0).Id).toEqual(1)
  })

  it('returns 2th house', () => {
    expect(getHouseFromDD(houses, 30).Id).toEqual(2)
  })

  it('returns 12th house', () => {
    expect(getHouseFromDD(houses, 350).Id).toEqual(12)
  })
})
