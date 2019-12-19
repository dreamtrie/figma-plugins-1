export function filterLayersByName (layers, layerName, exactMatch) {
  if (layerName === '') {
    return []
  }
  const regex = new RegExp(layerName, 'i')
  const result = []
  for (const layer of layers) {
    const matches = layer.name.match(regex)
    if (matches !== null) {
      if (exactMatch === true && layer.name !== matches[0]) {
        continue
      }
      result.push(layer)
    }
  }
  return result
}
