export default function multipleOptions(options, value) {
  const newOptions = [...options]
  const pos = newOptions.indexOf(value)

  if (pos > -1) {
    newOptions.splice(pos, 1)
  } else {
    newOptions.push(value)
  }

  return newOptions
}
