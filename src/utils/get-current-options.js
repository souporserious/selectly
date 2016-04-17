import buildLookup from './build-lookup'

export default function getOption(options, value) {
  const lookup = buildLookup(options)

  // if no value provided return the first option
  if (!value) {
    return lookup[Object.keys(lookup)[0]]
  // if an array we return an array of the selected options back
  } else if (value.constructor === Array) {
    return value.map(_value => lookup[_value])
  // otherwise just return the single selected option
  } else {
    return lookup[value]
  }
}
