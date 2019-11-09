import { validateString } from './utilities/validators'
import { decimalDegreesToDMS } from './utilities/math'
import { dmsString } from './utilities/copy'
import { modulo } from './utilities/math'
import { getZodiacSign, applyZodiacOffsetCounter } from './utilities/astrology'
class ZodiacPosition {
  constructor({ decimalDegrees=0.00, zodiac='tropical' }={}) {
    decimalDegrees = parseFloat(modulo(decimalDegrees, 360).toFixed(4))

    this.Sign = getZodiacSign({decimalDegrees: applyZodiacOffsetCounter(decimalDegrees, zodiac), zodiac: zodiac})
  }
}

export default ZodiacPosition
