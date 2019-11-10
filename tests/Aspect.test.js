import Aspect from '../src/Aspect'

describe('Aspect', () => {
  describe('constructor', () => {
    it('constructs properties', () => {
      const aspect = new Aspect({id: 'sun-moon', isPrimary: true, point1Key: 'sun', point2Key: 'moon', aspectKey: 'conjunction'})

      expect(aspect.aspectKey).toEqual('conjunction')
      expect(aspect.aspectLevel).toEqual('major')
      expect(aspect.label).toEqual('Conjunction')
    })
  })
})
