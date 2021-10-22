import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  once,
  pluralize,
  showUI
} from '@create-figma-plugin/utilities'

import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes.js'
import {
  CopyTextToClipboardRequest,
  CopyTextToClipboardResult
} from '../utilities/types.js'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more text layers'))
    return
  }
  const nodes = getSelectedTextNodes()
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No text layers in selection'))
    return
  }
  const string = nodes
    .map(function (node: TextNode) {
      return node.characters
    })
    .join('\n')
  if (string === '\n') {
    figma.closePlugin(formatErrorMessage('Nothing to copy'))
    return
  }
  once<CopyTextToClipboardResult>('COPY_TEXT_TO_CLIPBOARD_RESULT', function () {
    figma.closePlugin(
      formatSuccessMessage(
        `Copied ${nodes.length} ${pluralize(nodes.length, 'text layer')}`
      )
    )
  })
  showUI({ height: 129, width: 240 })
  emit<CopyTextToClipboardRequest>('COPY_TEXT_TO_CLIPBOARD_REQUEST', string)
}
