import { Children } from 'react'

export default function childrenPropType({ children }, propName, componentName) {
  if (Children.count(children) <= 1) {
    return new Error(`${componentName} requires two children, the first child as the trigger and the second child as the set of options.`)
  }
}
