import { validateString } from './utilities/validators'
import { decimalDegreesToDMS } from './utilities/math'
import { dmsString } from './utilities/copy'

class ZodiacPosition {
  constructor({ decimalDegrees=0.00, sign=null }={}) {
    this.DecimalDegrees = decimalDegrees
    this.ArcDegrees = decimalDegreesToDMS(decimalDegrees)
    this.ArcDegreesFormatted = dmsString(decimalDegreesToDMS(decimalDegrees))
    this.Sign = validateString(sign)
  }
}

export default ZodiacPosition
