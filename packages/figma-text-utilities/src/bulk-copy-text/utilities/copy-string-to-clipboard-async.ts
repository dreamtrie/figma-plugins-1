import { emit, once, showUI } from '@create-figma-plugin/utilities'

import {
  CopyStringToClipboardRequest,
  CopyStringToClipboardResult
} from './types'

export async function copyStringToClipboardAsync(
  string: string
): Promise<void> {
  return new Promise(function (resolve) {
    once<CopyStringToClipboardResult>(
      'COPY_STRING_TO_CLIPBOARD_RESULT',
      function () {
        figma.ui.close()
        resolve()
      }
    )
    showUI({ height: 0, width: 0 })
    emit<CopyStringToClipboardRequest>(
      'COPY_STRING_TO_CLIPBOARD_REQUEST',
      string
    )
  })
}