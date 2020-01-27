import { smartSortChildLayers } from './smart-sort-child-layers'

export function smartSortLayers (layers) {
  if (layers.length === 0) {
    return []
  }
  const parentLayer = layers[0].parent
  const layerIds = collectLayerIds(layers)
  return smartSortChildLayers(parentLayer, layerIds)
}

function collectLayerIds (layers) {
  const result = []
  for (const layer of layers) {
    result.push(layer.id)
  }
  return result
}
