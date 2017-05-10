import buildOptionsLookup from './build-options-lookup'

export default function getCurrentOptions(options, currentValue) {
  const lookup = buildOptionsLookup(options)

  // if no value provided return the first option
  if (!currentValue) {
    return new Array(lookup[Object.keys(lookup)[0]])
    // if an array we return an array of the selected options back
  } else if (currentValue.constructor === Array) {
    return currentValue.map(_value => lookup[_value])
    // otherwise just return the single selected option
  } else {
    return new Array(lookup[currentValue])
  }
}
