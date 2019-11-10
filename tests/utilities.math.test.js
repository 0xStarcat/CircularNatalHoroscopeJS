import { getModuloDifference, isDegreeWithinCircleArc } from '../src/utilities/math'

describe ('isDegreeWithinCircleArc', () => {
  it('returns true when degree equals lowArc', () => {
    expect(isDegreeWithinCircleArc(120, 150, 120)).toEqual(true)
  })

  it('returns false when degree equals highArc', () => {
    expect(isDegreeWithinCircleArc(120, 150, 150)).toEqual(false)
  })

  it('returns true when arc values are linear & within', () => {
    expect(isDegreeWithinCircleArc(120, 150, 140)).toEqual(true)
  })

  it('returns false when arc values are linear & without', () => {
    expect(isDegreeWithinCircleArc(120, 150, 151)).toEqual(false)
  })

  it('returns true when arc values are modulo-ed & within', () => {
    expect(isDegreeWithinCircleArc(330, 0, 340)).toEqual(true)
  })

  it('returns true when arc values are modulo-ed & within 2', () => {
    expect(isDegreeWithinCircleArc(350, 20, 1)).toEqual(true)
  })

  it('returns false when arc values are modulo-ed & without', () => {
    expect(isDegreeWithinCircleArc(330, 0, 10)).toEqual(false)
  })
})

// describe('getModuloDifference', () => {
//   describe('edge cases', () => {
//     it ('returns value', () => {
//
//       expect(getModuloDifference(270, 260)).toEqual(-10)
//     })
//
//     it ('returns value', () => {
//
//       expect(getModuloDifference(270, 1)).toEqual(91)
//     })
//   })
// })
