export default function getToggledValues(prevValues = [], nextValues) {
  const newValues = [...prevValues]

  if (nextValues.constructor !== Array) {
    nextValues = [nextValues]
  }

  nextValues.forEach(value => {
    const pos = newValues.indexOf(value)
    if (pos > -1) {
      newValues.splice(pos, 1)
    } else {
      newValues.push(value)
    }
  })

  return newValues
}
