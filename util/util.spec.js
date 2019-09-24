const {} = require('mocha')
const { expect } = require('chai')

const { reorderCoordBySpace, cvtSpace, cvtRealVoxel } = require('./util')

const SPACE = {
  RAS: 'RAS',
  PIR: 'PIR',
  RPI: 'RPI'
}

describe('reorderCoordBySpace', () => {
  
  it('should transform PIR to RAS', () => {
    const xform = reorderCoordBySpace({ coordSpace: SPACE.PIR }, {coordSpace: SPACE.RAS})
    expect(xform(SPACE.PIR).join('')).to.be.equal(SPACE.RPI)
  })
})

describe('cvtSpace', () => {
  const dims = [
    100,
    200,
    300
  ]
  it('should convert RPI to RAS properly', () => {
    const xform = cvtSpace({coordSpace: SPACE.RPI, dims}, {coordSpace: SPACE.RAS})
    const original = [1, 2, 3]
    expect(xform(original)).to.be.deep.equal([1, 198, 297])
  })
})

describe('cvtRealVoxel', () => {

  const voxelDims = [0.01, 0.01, 0.01]
  it('should convert voxel to real properly', () => {
    const xform = cvtRealVoxel({ voxelDims, realFlag: false }, {realFlag: true})
    const original = [1, 2, 3]
    expect(xform(original)).to.deep.equal([0.01, 0.02, 0.03])
  })
})