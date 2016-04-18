import buildOptionsLookup from './build-options-lookup'

export default function getAllValues(options) {
  const lookup = buildOptionsLookup(options)
  return Object.keys(lookup).map(key => lookup[key].value)
}
