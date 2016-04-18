export default function getToggledOptions(options, values) {
  const newOptions = [...options]

  if (values.constructor !== Array) {
    values = [values]
  }

  values.forEach(value => {
    const pos = newOptions.indexOf(value)

    if (pos > -1) {
      newOptions.splice(pos, 1)
    } else {
      newOptions.push(value)
    }
  })

  return newOptions
}
