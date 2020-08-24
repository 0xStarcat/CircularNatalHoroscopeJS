import { ASPECTS } from './constants'
import { modulo } from './utilities/math'
import { LANGUAGE } from './utilities/language'

/** Class representing an aspect. */
export default class Aspect {
  /**
     * Create an aspect.
     * @param {string} id - The string id that a pair of aspects should share. (Sun - Moon) should = "sun-moon" and (Moon - Sun) should = "sun-moon" too.
     * @param {bool} isPrimary - The designation for the point being the primary aspect of the pair. (Sun - Moon) should be primary and (Moon - Sun) should not be.
     * @param {string} point1Key - The id token of point1 - please refer to list
     * @param {string} point2Key - The id token of point2 - please refer to list
     * @param {string} aspectKey - The key of the aspect - please refer to ASPECTS constant
  */

  constructor({ point1Key = '', point2Key = '', aspectKey = '', orb = 0, orbUsed = 0, language = 'en' } = {}) {
    //
    this.point1Key = point1Key
    this.point1Label = LANGUAGE[language][point1Key]
    this.point2Label = LANGUAGE[language][point2Key]
    this.point2Key = point2Key
    this.aspectKey = aspectKey
    this.aspectLevel = ASPECTS[aspectKey].level
    this.aspectLevelLabel = LANGUAGE[language][ASPECTS[aspectKey].level]
    this.label = LANGUAGE[language][aspectKey]
    this.orb = orb
    this.orbUsed = orbUsed
  }
}
