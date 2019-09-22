export const signs = [
  {
    name: 'Aries'
  },
  {
    name: 'Taurus'
  },
  {
    name: 'Gemini'
  },
  {
    name: 'Cancer'
  },
  {
    name: 'Leo'
  },
  {
    name: 'Virgo'
  },
  {
    name: 'Libra'
  },
  {
    name: 'Scorpio'
  },
  {
    name: 'Sagittarius'
  },
  {
    name: 'Capricorn'
  },
  {
    name: 'Aquarius'
  },
  {
    name: 'Pisces'
  },
]

export const getSignFromDD = decimalDegree => {
  // Converts a decimal degree (0 - 359) into its astrological sign
  //////////
  // * float decimalDegree
  // => returns { <signObject> }
  //////////

  const signIndex = Math.floor(decimalDegree / 30)
  return signs[signIndex]
}
