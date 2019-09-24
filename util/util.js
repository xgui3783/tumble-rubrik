const x = new Set(['L', 'R']),
  y = new Set(['A', 'P']),
  z = new Set(['S', 'I'])

const determineAxis = letter => [x, y, z].find(sth => sth.has(letter))

const validateSpace = spaceString => {
  if(spaceString.length !== 3) throw new Error('space needs to be 3 letters long')
  const set = spaceString.split('')
    .map(l => l.toUpperCase())
    .reduce((acc, curr) => new Set(acc).add(determineAxis(curr)), new Set())
  if(set.length < 3 || set.has(undefined)) throw new Error('set is ill defined')
  return spaceString
}

/**
 * 
 * @param {Space} fromSpace
 * @param {Space} toSpace
 * @Output {Function} coord => reorderedCoord 
 * n.b. only reorders. 
 * So it wil turn RAS to ARS etc, but will not convert RAS to ALS
 */
const reorderCoordBySpace = ({coordSpace: input}, {coordSpace: target}) => {
  const arr = target.split('')
    .map(letter => 
      input.split('').findIndex(l => determineAxis(l) === determineAxis(letter))
    )
  return (tuple) => [0, 1, 2].map(v => tuple[arr[v]])
}

/**
 * 
 * @param {Object} fromSpace 
 * @param {Object} toSpace 
 * n.b. only converts values. Strict equality check, if fails, assumes opposite.
 * e.g. RAS, ARS will result in output of LPS
 * use @function {reorderCoordBySpace} first to convert order
 */
const cvtSpace = ({ coordSpace: fromCoordSpace, dims:fromDims }, { coordSpace: toCoordSpace }) => tuple  => tuple.map((v, idx) => 
  fromCoordSpace[idx] === toCoordSpace[idx]
    ? v
    : fromDims[idx] - v)

const cvtRealVoxel = ({ voxelDims, realFlag: fromRealFlag }, { realFlag: toRealFlag }) => tuple => tuple.map((v, idx) => {
  let out = v

  // if source is voxel, convert to real
  if (!fromRealFlag) out *= voxelDims[idx]
  if (!toRealFlag) out /= voxelDims[idx]
  return out
})

export {
  validateSpace,
  reorderCoordBySpace,
  cvtSpace,
  cvtRealVoxel
}