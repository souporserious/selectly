export default function isOptionSelected(currentValue, value) {
  if (!value || !currentValue) {
    return false
  } else {
    if (currentValue.constructor === Array) {
      return currentValue.indexOf(value) > -1
    } else {
      return value === currentValue
    }
  }
}
