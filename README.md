# tumble rubrik

## Install

```
npm i -s tumble-rubrik
```

## Usage

In node:

```js
const { Space, presetMap } = require('tumble-rubrik')

const presetMapNames = [...presetMap.keys()] // [ 'allenCCFv3_2017_10', 'WHSv3' ]

// Allen mouse brain CCF v3 is one of the preset
const ambaCcfv3 = new Space({ presetSpaceName: 'allenCCFv3_2017_10' })
const xformToRasReal = ambaCcfv3.getTransformCoordFn({
  realFlag: true,
  coordSpace: 'RAS'
})

// structure center of structure_id 1084, Presubiculum structure_centers 
// while csv provides [9330, 3600, 2940], it was in um
// As the space definition was in voxel space, we converted it to voxel, based on voxel dimension of [0.01, 0.01, 0.01] mm/voxel
const coord = [933, 360, 294]

const newCoord = xformToRasReal(coord) // [2.94, 3.87, 4.40]

```

## Test
```
npm test
```

## License
MIT