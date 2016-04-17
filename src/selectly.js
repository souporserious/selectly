export { default as Select } from './Select'
export { default as Option } from './Option'

import buildLookup from './utils/build-lookup'
import getCurrentOptions from './utils/get-current-options'
import getToggledOptions from './utils/get-toggled-options'
import isOptionSelected from './utils/is-option-selected'

export const utils = {
  buildLookup,
  getCurrentOptions,
  getToggledOptions,
  isOptionSelected
}
