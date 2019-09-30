import { validateString } from './utilities/validators'
import { decimalDegreesToDMS } from './utilities/math'
import { dmsString } from './utilities/copy'
import { modulo } from './utilities/math'

class ZodiacPosition {
  constructor({ decimalDegrees=0.00, sign=null }={}) {
    this.DecimalDegrees = decimalDegrees
    this.ArcDegrees = decimalDegreesToDMS(decimalDegrees)
    this.ArcDegreesFormatted = dmsString(decimalDegreesToDMS(decimalDegrees))
    this.ArcDegreesFormatted30 = dmsString(decimalDegreesToDMS(modulo(decimalDegrees, 30)))
    this.Sign = validateString(sign)
  }
}

export default ZodiacPosition
