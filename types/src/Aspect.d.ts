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
    constructor({ point1Key, point2Key, aspectKey, orb, orbUsed, language }?: string);
    point1Key: any;
    point1Label: any;
    point2Label: any;
    point2Key: any;
    aspectKey: any;
    aspectLevel: any;
    aspectLevelLabel: any;
    label: any;
    orb: any;
    orbUsed: any;
}
