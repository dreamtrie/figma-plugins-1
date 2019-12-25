/* global figma */
import {
  addEventListener,
  extractLayerAttributes,
  formatErrorMessage,
  formatSuccessMessage,
  onSelectionChange,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { sortLayersByName } from 'figma-sort-layers/src/sort-layers-by-name'
import { getAllLayers } from '../utilities/get-all-layers'
import { getSelectedLayers } from '../utilities/get-selected-layers'

export default function () {
  const layers = getLayers()
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage('No frames/components on page'))
    return
  }
  onSelectionChange(function () {
    triggerEvent('SELECTION_CHANGED', {
      layers: getLayers()
    })
  })
  addEventListener('SUBMIT', function ({ selectedLayerId }) {
    const layer = figma.getNodeById(selectedLayerId)
    figma.viewport.scrollAndZoomIntoView([layer])
    figma.currentPage.selection = [layer]
    figma.closePlugin(
      formatSuccessMessage(`Jumped to ${layer.type.toLowerCase()}`)
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 308 },
    { layers, selectedLayerId: getSelectedLayerId() }
  )
}

function getLayers () {
  const layers = sortLayersByName(getAllLayers())
  return extractLayerAttributes(layers, ['id', 'name', 'type'])
}

function getSelectedLayerId () {
  const selectedLayers = getSelectedLayers()
  return selectedLayers.length === 1 ? selectedLayers[0].id : null
}
