import Sign from '../src/Sign'

describe('Sign', () => {
  describe('constructor', () => {
    test('Get name', () => {
      expect(new Sign({id: 11}).Name).toBe('Pisces')
    })
  })
})
