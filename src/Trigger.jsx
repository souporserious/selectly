import React, { PropTypes } from 'react'
import { Target } from 'react-popper'
import { Trigger as ARIATrigger } from 'react-aria'
import Measure from 'react-measure'

const Trigger = ({
  children,
  ...restProps
}, {
  selectly
}) => {
  const { value, isOpen, toggle, autoWidth, onTriggerMeasure } = selectly
  const stringValue = value && value.constructor === Array
    ? value.join(', ')
    : value
  let childrenToRender

  if (typeof children === 'function') {
    childrenToRender = props => children(props, {
      isOpen,
      value,
      stringValue
    })
  } else if (children) {
    childrenToRender = children
  } else if (value) {
    childrenToRender = stringValue
  }

  const component = (
    <Target component={false}>
      <ARIATrigger
        isOpen={isOpen}
        keybindings={[' ']}
        onTrigger={toggle}
        children={childrenToRender}
        {...restProps}
      />
    </Target>
  )

  return autoWidth
    ? <Measure
        onMeasure={onTriggerMeasure}
        children={component}
      />
    : component
}

Trigger.contextTypes = {
  selectly: PropTypes.object
}

export default Trigger
