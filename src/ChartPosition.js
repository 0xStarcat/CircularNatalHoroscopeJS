import { decimalDegreesToDMS } from './utilities/math'
import { dmsString } from './utilities/copy'
import { modulo } from './utilities/math'

export default class ChartPosition {
  constructor({horizonDegrees = 0.00, eclipticDegrees = 0.00}={}) {
    horizonDegrees = parseFloat(modulo(horizonDegrees, 360).toFixed(4))
    eclipticDegrees = parseFloat(modulo(eclipticDegrees, 360).toFixed(4))

    this.Horizon = {
      DecimalDegrees: horizonDegrees,
      ArcDegrees: decimalDegreesToDMS(horizonDegrees),
      ArcDegreesFormatted: dmsString(decimalDegreesToDMS(horizonDegrees)),
      ArcDegreesFormatted30: dmsString(decimalDegreesToDMS(modulo(horizonDegrees, 30)))
    }

    this.Ecliptic = {
      DecimalDegrees: eclipticDegrees,
      ArcDegrees: decimalDegreesToDMS(eclipticDegrees),
      ArcDegreesFormatted: dmsString(decimalDegreesToDMS(eclipticDegrees)),
      ArcDegreesFormatted30: dmsString(decimalDegreesToDMS(modulo(eclipticDegrees, 30)))
    }
  }
}
