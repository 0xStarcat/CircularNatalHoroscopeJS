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
