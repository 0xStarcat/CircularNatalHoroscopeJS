import { modulo, degreesToRadians, radiansToDegrees, tanFromDegrees, cosFromDegrees, sinFromDegrees } from './math'

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

export const calculatePlacidianHouseCusps = ({rightAscensionMC=0.00, midheaven=0.00, ascendent=0.00, latitude=0.00, obliquityEcliptic=23.4367}={}) => {
  //////////
  // source: An Astrological House Formulary by Michael P. Munkasey, page 18
  // verified within +-10 minutes of values in https://astrolibrary.org/compare-house-systems/

  const cuspInterval = (cuspNumber) => {
    let n
    switch(cuspNumber) {
      case 2:
        return rightAscensionMC + 120
        break
      case 3:
        return rightAscensionMC + 150
        break
      case 11:
        return rightAscensionMC + 30
        break
      case 12:
        return rightAscensionMC + 60
        break
    }
  }

  const semiArcRatio = (cuspNumber) => {
    switch(cuspNumber) {
      case 2:
        return 2 / 3
      case 3:
        return 1 / 3
      case 11:
        return 1 / 3
      case 12:
        return 2 / 3
    }
  }

  const initialCuspalDeclination = (interval, semiArcRatio) => {
    // returns => in radians
    return Math.asin(sinFromDegrees(obliquityEcliptic) * sinFromDegrees(interval))
  }

  const calculatedCusp = cuspNumber => {
    const interval = cuspInterval(cuspNumber)
    const saRatio = semiArcRatio(cuspNumber)
    let cuspValue = initialCuspalDeclination(interval, semiArcRatio)
    let prevCuspValue = 0

    // Iterates until difference is tiny
    while(Math.abs(cuspValue - prevCuspValue) > 0.01) {
      const tanCusp = Math.tan(cuspValue)
      // const a = saRatio * Math.asin(tanFromDegrees(latitude) * tanCusp) // radians
      // const m = Math.atan(Math.sin(a) / (cosFromDegrees(obliquityEcliptic) * tanCusp)) // radians
      // ** NOTE **
      // An error with Munkasey's formula results in a trignomic impossibility
      // where const "a" takes the arcsin of a number greater than 1.
      // The following "m" step was found on a forum as a trigonomic simplification of Munkasey's steps 5 + 6 which removes the need for arcsin
      const m = Math.atan(saRatio * (tanFromDegrees(latitude) / cosFromDegrees(interval))) // https://www.astrologyweekly.com/forum/showthread.php?t=50451
      const r = Math.atan((tanFromDegrees(interval) * Math.cos(m)) / Math.cos(m + degreesToRadians(obliquityEcliptic)))
      prevCuspValue = cuspValue
      cuspValue = r
    }

    return radiansToDegrees(cuspValue) + 180
  }

  const c1 = ascendent
  const c2 = modulo(calculatedCusp(2), 360)
  const c3 = modulo(calculatedCusp(3), 360)
  const c4 = modulo(midheaven + 180, 360)
  const c10 = midheaven
  const c11 = calculatedCusp(11)
  const c12 = calculatedCusp(12)
  const c5 = modulo(c11 + 180, 360)
  const c6 = modulo(c12 + 180, 360)
  const c7 = modulo(ascendent + 180, 360)
  const c8 = modulo(c2 + 180, 360)
  const c9 = modulo(c3 + 180, 360)

  // ** For debugging **
  // const rawArr = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12]
  // console.log(rawArr)

  // ** NOTE ** the calculated houses may require a 180 degree correction
  const shouldMod180 = (prevCusp, currentCusp) => {
    // all values are mod360ed
    if (currentCusp < prevCusp) {
      // For instances when prev = 350 and current = 20
      // But not when prev = 250 and current = 100 (280)
      if (modulo(prevCusp + currentCusp, 360) < prevCusp && Math.abs(currentCusp - prevCusp) >= 180) return false
      return true
    } else if (prevCusp < currentCusp) {
      if (currentCusp - prevCusp < 180) return false
      return true
    }
  }

  const firstCusp = c1.toFixed(4)
  const secondCusp =  shouldMod180(c1, c2) ? modulo(c2 + 180, 360).toFixed(4) : c2.toFixed(4)
  const thirdCusp =  shouldMod180(c1, c3) ? modulo(c3 + 180, 360).toFixed(4) : c3.toFixed(4)
  const fourthCusp = c4.toFixed(4)
  const fifthCusp = shouldMod180(c4, c5) ? modulo(c5 + 180, 360).toFixed(4) : c5.toFixed(4)
  const sixthCusp = shouldMod180(c4, c6) ? modulo(c6 + 180, 360).toFixed(4) : c6.toFixed(4)
  const seventhCusp = c7.toFixed(4)
  const eighthCusp = shouldMod180(c7, c8) ? modulo(c8 + 180, 360).toFixed(4) : c8.toFixed(4)
  const ninthCusp = shouldMod180(c7, c9) ? modulo(c9 + 180, 360).toFixed(4) : c9.toFixed(4)
  const tenthCusp = c10.toFixed(4)
  const eleventhCusp = shouldMod180(c10, c11) ? modulo(c11 + 180, 360).toFixed(4) : c11.toFixed(4)
  const twelthCusp = shouldMod180(c10, c12) ? modulo(c12 + 180, 360).toFixed(4) : c12.toFixed(4)

  const arr = [
    firstCusp, secondCusp, thirdCusp, fourthCusp, fifthCusp, sixthCusp,
    seventhCusp, eighthCusp, ninthCusp, tenthCusp, eleventhCusp, twelthCusp
  ]

  return arr
}


export const calculateWholeSignHouseCusps = ({ascendent=0.00}={}) => {
  const startingDegree = Math.floor(ascendent / 30) * 30
  return new Array(12).fill(undefined).map((el, index) => {
    return modulo(index ? (index * 30) + startingDegree : index + startingDegree, 360)
  })
}
