const mocha = require('mocha')
const { expect, assert } = require('chai')

const { Space } = require('./index')

describe('Class Space', () => {
  it('should translate allen v3 2017', () => {
    const ambav32017 = new Space({ presetSpaceName: 'allenCCFv3_2017_10' })

    const xformFn = ambav32017.getTransformCoordFn({ realFlag: true, coordSpace: 'RAS' })
    const original = [933,360,294]

    const xlate = [-5737500,-6637500,-4037500].map(v => v / 1e6)
    const newVal = xformFn(original).map((v, idx) => v + xlate[idx])

    const expectedVal = [-2.797, -2.767, 0.363]
    expect(newVal.every((val, idx) => {
      return Math.abs(val - expectedVal[idx]) < 1e-3
    })).to.be.true
  })

  it('should convert from nehuba amba to original', () => {
    const nehubaAmbaV3 = new Space({
      realFlag: true,
      coordSpace: 'RAS',
      voxelDims: [0.01, 0.01, 0.01],
      dims: [11.4, 13.2, 8]
    })

    const xlate = [-5737500,-6637500,-4037500].map(v => v / 1e6)
    const nehubaVal = [-2.797, -2.767, 0.363]

    const xform = nehubaAmbaV3.getTransformCoordFn({ realFlag: false, coordSpace: 'PIR' })
    const originalVal = nehubaVal.map((v, idx) => v - xlate[idx])

    const expectedVal = [933,360,294]
    const output = xform(originalVal)
    
    expect(output.every((val, idx) => Math.abs(val - expectedVal[idx]) < 1e-1)).to.be.true
  })
})