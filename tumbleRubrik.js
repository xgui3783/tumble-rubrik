import { reorderCoordBySpace, cvtSpace, cvtRealVoxel } from './util/util'

const presetMap = new Map([
  ['allenCCFv3_2017_10', {
    realFlag: false,
    coordSpace: 'PIR',
    voxelDims: [0.01, 0.01, 0.01],
    dims: [1320, 800, 1140]
  }],
  ['WHSv3', {
    realFlag: false,
    coordSpace: 'RAS',
    voxelDims: [0.0390625, 0.0390625, 0.0390625],
    dims: [512, 1024, 512]
  }]
])

/**
 * voxel dimension in mm/voxel
 * dims unit depends on realFlag
 * if realFlag is true, then dims is in [mm, mm, mm]
 * else, dims is in [voxel, voxel, voxel]
 */
class Space{
  constructor({ presetSpaceName, realFlag, coordSpace, voxelDims, dims } = {}){
    if (presetSpaceName && presetMap.get(presetSpaceName)) {
      const {
        realFlag,
        coordSpace,
        voxelDims,
        dims
      } = presetMap.get(presetSpaceName)
      this.realFlag = realFlag,
      this.coordSpace = coordSpace
      this.voxelDims = voxelDims
      this.dims = dims
      return
    }

    this.realFlag = realFlag,
    this.coordSpace = coordSpace
    this.voxelDims = voxelDims
    this.dims = dims
  }

  getTransformCoordFn({ realFlag = this.realFlag, coordSpace = this.coordSpace } = {}){
    
    const reorderFn = reorderCoordBySpace(this, { coordSpace })
    const reorderedFromCoordSpace = reorderFn(this.coordSpace.split('')).join('')
    const reorderedDims = reorderFn(this.dims)

    const cvtSpaceFn = cvtSpace({coordSpace: reorderedFromCoordSpace, dims: reorderedDims}, { coordSpace })
    const reorderedVoxelDim = reorderFn(this.voxelDims)

    const getVoxelReal = cvtRealVoxel({ voxelDims: reorderedVoxelDim ,realFlag: this.realFlag }, { realFlag })

    return tuple => getVoxelReal(cvtSpaceFn(reorderFn(tuple)))
  }
}

export {
  Space,
  presetMap
}