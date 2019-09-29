import { getZodiacSign, getSignFromDD } from '../src/utilities/astrology'

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
