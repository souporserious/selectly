import { Select as ReactARIASelect } from 'react-aria'
import Select from './Select'
import Trigger from './Trigger'
import Menu from './Menu'
import buildOptionsLookup from './utils/build-options-lookup'
import getCurrentOptions from './utils/get-current-options'
import getToggledValues from './utils/get-toggled-values'
import getAllValues from './utils/get-all-values'
import isOptionSelected from './utils/is-option-selected'

const { Option } = ReactARIASelect

export const utils = {
  buildOptionsLookup,
  getCurrentOptions,
  getToggledValues,
  getAllValues,
  isOptionSelected
}

export {
  Select,
  Trigger,
  Menu,
  Option
}
