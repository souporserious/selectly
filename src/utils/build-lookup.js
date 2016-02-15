export default function buildLookup(options, _lookup = {}) {
  for (let i = 0, len = options.length; i < len; i++) {
    const option = options[i]
    const { optgroup, value, label } = option

    if (optgroup) {
      buildLookup(optgroup, _lookup)
    } else {
      _lookup[value] = options[i]
    }
  }
  return _lookup
}
