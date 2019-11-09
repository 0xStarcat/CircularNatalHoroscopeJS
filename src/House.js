import { zodiacPositionToEcliptic } from './utilities/astrology'
import { modulo } from './utilities/math'
import ChartPosition from './ChartPosition'

export default class House {
  constructor({ascendantDegrees=0, zodiacDegreesStart=0, zodiacDegreesEnd=0, id=0}={}) {
    zodiacDegreesStart = parseFloat(modulo(zodiacDegreesStart, 360).toFixed(4))
    zodiacDegreesEnd = parseFloat(modulo(zodiacDegreesEnd, 360).toFixed(4))

    const eclipticDegreesStart = zodiacPositionToEcliptic(ascendantDegrees, zodiacDegreesStart)
    const eclipticDegreesEnd = zodiacPositionToEcliptic(ascendantDegrees, zodiacDegreesEnd)

    this.StartPosition = new ChartPosition({eclipticDegrees: eclipticDegreesStart, zodiacDegrees: zodiacDegreesStart})

    this.EndPosition = new ChartPosition({eclipticDegrees: eclipticDegreesEnd, zodiacDegrees: zodiacDegreesEnd})

    this.Id = id
  }
}
