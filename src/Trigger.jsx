import React, { PropTypes } from 'react'
import { Target } from 'react-popper'
import { Trigger as ARIATrigger } from 'react-aria'
import Measure from 'react-measure'

const Trigger = ({
  defaultValue,
  renderLabel = label => label,
  children,
  ...restProps
}, {
  selectly
}) => {
  const {
    value,
    selectedOptions,
    isOpen,
    toggle,
    autoWidth,
    onTriggerMeasure
  } = selectly
  let childrenToRender

  if (typeof children === 'function') {
    childrenToRender = props => children(props, {
      isOpen,
      value,
      selectedOptions
    })
  } else if (children) {
    childrenToRender = children
  } else if (selectedOptions.length > 0) {
    childrenToRender = selectedOptions.map(o => renderLabel(o.label))
  } else {
    childrenToRender = defaultValue
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
