
const nehubaAllenv3 = {
  transl: [-5737500,-6637500,-4037500].map(v => v / 1e6),
  translRealFlag: true,
  translSpace: 'RAS',

  dims:[456,528,320],
  dimsRealFlag:false,
  dimsSpace:'RAS',
  voxelDims:[0.025, 0.025, 0.025],
}

const nehubaWaxholmv2 = {
  transl: [-9550781,-24355468,-9707031].map(v => v / 1e6),
  translRealFlag: true,
  translSpace: 'RAS',

  dims:[512,1024,512],
  dimsRealFlag:false,
  dimsSpace:'RAS',
  voxelDims:[0.0390625, 0.0390625, 0.0390625],
}

// TODO add native allen ccf v3 and waxholm v2

const dict = new Map([
  ['nehuba_amba_v3', nehubaAllenv3],
  ['nehuba_waxholm_v2', nehubaWaxholmv2]
])

export {
  dict
}