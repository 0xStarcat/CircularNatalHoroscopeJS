import { ASPECTS, BODIES, POINTS, ANGLES } from '../constants'
import Horoscope from '../Horoscope'

export const validateYear = (year) => {
  if (year > 0) return year
  else throw new Error(`The year: "${year}" - must be an integer and > 0 (C.E.)`)
}

export const validateMonth = (month) => {
  if (month >= 0 && month <= 11) return month
  else throw new Error(`The month: "${month}" - must be an integer and between 0 - 11. (0 = January, 11 = December)`)
}

export const validateDate = (date) => {
  if (date >= 1 && date <= 31) return date
  else throw new Error(`The date: "${date} must be between 1 - 31`)
}

export const validateHour = (hour) => {
  if (hour >= 0 && hour <= 23) return hour
  else throw new Error(`The hour: "${hour}" - must be an integer and between 0 - 23. (0 = midnight 00:00, 23 = 11pm (23:00))`)
}

export const validateMinute = (minute) => {
  if (minute >= 0 && minute <= 59) return minute
  else throw new Error(`The minute: "${minute}" - must be an integer and between 0 - 59`)
}

export const validateLatitude = (latitude) => {
  if (latitude >= -90 && latitude <= 90) return latitude
  else throw new Error(`The latitude: "${latitude}" - must be an float and between -90.00 to 90.00`)
}

export const validateLongitude = (longitude) => {
  if (longitude >= -180 && longitude <= 180) return longitude
  else throw new Error(`The longitude: "${longitude}" - must be an float and between -180.00 to 180.00`)
}

export const validateString = string => {
  if (!string) throw new Error(`Invalid string: ${string}`)
  return string
}

export const validateStringOrArray = stringOrArray => {
  if (!Array.isArray(stringOrArray) && typeof stringOrArray !== 'string') {
    throw new Error('Please pass a string or an array into aspectTypes')
  } else if (typeof stringOrArray === 'string') {
    stringOrArray = [stringOrArray]
  }

  return stringOrArray
}

const distinctArray = array => {
  return array.filter((value, index) => array.indexOf(value) === index)
}

const getValidAspects = () => {
  let validAspectKeysTypes = ['all']
  Object.keys(ASPECTS).forEach(key => {
    validAspectKeysTypes.push(ASPECTS[key].level)
  })

  Object.keys(ASPECTS).forEach(key => {
    validAspectKeysTypes.push(key)
  })

  validAspectKeysTypes = distinctArray(validAspectKeysTypes)

  return validAspectKeysTypes
}


export const validateAspectTypes = (stringOrArray) => {
  stringOrArray = validateStringOrArray(stringOrArray)

  const validAspectKeysTypes = getValidAspects()

  if (!stringOrArray.every(value => validAspectKeysTypes.includes(value))) {
    throw new Error(`'${stringOrArray}' is not a valid aspect choice. Please use values from the following: ${validAspectKeysTypes.join(', ')}`)
  }

  if (stringOrArray.includes('all')) {
    stringOrArray = [...Object.keys(ASPECTS)]
    stringOrArray = stringOrArray.filter(k => k !== 'all')
  }

  stringOrArray.forEach(key => {
    if (Object.keys(ASPECTS).some(aspectKey => ASPECTS[aspectKey].level === key)) {
      stringOrArray = [...stringOrArray, ...Object.keys(ASPECTS).filter(aspectKey => ASPECTS[aspectKey].level === key)]
      stringOrArray = stringOrArray.filter(k => k !== key)
    }
  })

  stringOrArray = distinctArray(stringOrArray)

  return stringOrArray
}

export const validateHouseSystem = (string, language) => {
  if (Horoscope.HouseSystems(language).map(l => l.value).includes(string.toLowerCase())) return string.toLowerCase()
  else throw new Error(`The "${string}" house system is not included. Please choose from the following list: ${Horoscope.HouseSystems(language).map(l => l.value).join(', ')}.`)
}

export const validateZodiac = (string, language) => {
  if (Horoscope.ZodiacSystems(language).map(l => l.value).includes(string.toLowerCase())) return string.toLowerCase()
  else throw new Error(`The "${string}" zodiac is not included. Please choose from the following list: ${Horoscope.ZodiacSystems(language).map(l => l.value).join(', ')}.`)
}

export const validateAspectPoints = (stringOrArray) => {
  stringOrArray = validateStringOrArray(stringOrArray)

  const validAspectPoints = ['all', 'bodies', 'points', 'angles', ...Object.keys(BODIES), ...Object.keys(POINTS), ...Object.keys(ANGLES)]

  if (!stringOrArray.every(value => validAspectPoints.includes(value))) {
    throw new Error(`'${stringOrArray}' is not a valid aspectPoint choice. Please use values from the following: ${validAspectPoints.join(', ')}`)
  }

  if (stringOrArray.includes('all')) {
    stringOrArray = [...Object.keys(BODIES), ...Object.keys(POINTS), ...Object.keys(ANGLES)]
    stringOrArray = stringOrArray.filter(k => k !== 'all')
  }

  if (stringOrArray.includes('bodies')) {
    stringOrArray = [...stringOrArray, ...Object.keys(BODIES)]
    stringOrArray = stringOrArray.filter(k => k !== 'bodies')
  }

  if (stringOrArray.includes('points')) {
    stringOrArray = [...stringOrArray, ...Object.keys(POINTS)]
    stringOrArray = stringOrArray.filter(k => k !== 'points')
  }

  if (stringOrArray.includes('angles')) {
    stringOrArray = [...stringOrArray, ...Object.keys(ANGLES)]
    stringOrArray = stringOrArray.filter(k => k !== 'angles')
  }

  stringOrArray = distinctArray(stringOrArray)

  return stringOrArray
}

export const validateCustomOrbs = customOrbs => {
  const min = 0
  const max = 12
  Object.keys(customOrbs).forEach(orbKey => {
    if (!ASPECTS[orbKey]) throw new Error(`"${orbKey}" is not a valid custom orb.`)
    customOrbs[orbKey] = parseFloat(customOrbs[orbKey])
    if (customOrbs[orbKey] < min) throw new Error(`Custom orb "${orbKey}" must be > ${min}.`)
    if (customOrbs[orbKey] > max) throw new Error(`Custom orb "${orbKey}" must be <= ${max}.`)
  })

  return customOrbs
}
