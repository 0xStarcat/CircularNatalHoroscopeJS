import { getSignFromDD } from './astrology'
import { decimalDegreesToDMS } from './math'

export const dmsString = dmsObject => {
  return `${dmsObject.degrees}° ${dmsObject.minutes}' ${dmsObject.seconds}''`
}

export const signDecimalDegrees = decimalDegrees => {
  return `${getSignFromDD(decimalDegrees).name} ${decimalDegrees % 30}`
}

export const signDMS = decimalDegrees => {
  return `${getSignFromDD(decimalDegrees).name} ${dmsString(decimalDegreesToDMS(decimalDegrees % 30))}`
}
