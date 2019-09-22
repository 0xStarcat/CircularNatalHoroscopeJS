import { getSignFromDD } from '../src/utilities/astrology'

test('getSignFromDD - 1', () => {
  const sign = getSignFromDD(5.6789)
  expect(sign.name).toBe("Aries")
})

test('getSignFromDD - 2', () => {
  const sign = getSignFromDD(180.6789)
  expect(sign.name).toBe("Libra")
})

test('getSignFromDD - 3', () => {
  const sign = getSignFromDD(355.6789)
  expect(sign.name).toBe("Pisces")
})
