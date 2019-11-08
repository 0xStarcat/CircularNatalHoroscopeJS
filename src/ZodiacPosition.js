import { validateString } from './utilities/validators'
import { decimalDegreesToDMS } from './utilities/math'
import { dmsString } from './utilities/copy'
import { modulo } from './utilities/math'
import { getZodiacSign } from './utilities/astrology'
class ZodiacPosition {
  constructor({ decimalDegrees=0.00, zodiac='tropical' }={}) {
    this._zodiac = zodiac
    this._decimalDegrees = decimalDegrees
    this.DecimalDegrees = decimalDegrees
    this.ArcDegrees = decimalDegreesToDMS(decimalDegrees)
    this.ArcDegreesFormatted = dmsString(decimalDegreesToDMS(decimalDegrees))
    this.ArcDegreesFormatted30 = dmsString(decimalDegreesToDMS(modulo(decimalDegrees, 30)))
    this.Sign = getZodiacSign({decimalDegrees: this._decimalDegrees, zodiac: this._zodiac})
  }
}

export default ZodiacPosition
