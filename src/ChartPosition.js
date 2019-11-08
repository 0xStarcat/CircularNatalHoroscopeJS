import { decimalDegreesToDMS } from './utilities/math'
import { dmsString } from './utilities/copy'
import { modulo } from './utilities/math'

export default class ChartPosition {
  constructor({eclipticDegrees = 0.00, zodiacDegrees = 0.00}={}) {
    eclipticDegrees = parseFloat(modulo(eclipticDegrees, 360).toFixed(4))
    zodiacDegrees = parseFloat(modulo(zodiacDegrees, 360).toFixed(4))

    this.Ecliptic = {
      DecimalDegrees: eclipticDegrees,
      ArcDegrees: decimalDegreesToDMS(eclipticDegrees),
      ArcDegreesFormatted: dmsString(decimalDegreesToDMS(eclipticDegrees)),
      ArcDegreesFormatted30: dmsString(decimalDegreesToDMS(modulo(eclipticDegrees, 30)))
    }

    this.Zodiac = {
      DecimalDegrees: zodiacDegrees,
      ArcDegrees: decimalDegreesToDMS(zodiacDegrees),
      ArcDegreesFormatted: dmsString(decimalDegreesToDMS(zodiacDegrees)),
      ArcDegreesFormatted30: dmsString(decimalDegreesToDMS(modulo(zodiacDegrees, 30)))
    }
  }
}
