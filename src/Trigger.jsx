import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Target } from 'react-popper'
import { Trigger as ARIATrigger } from 'react-aria'
import Measure from 'react-measure'

const Trigger = (
  { defaultValue, renderLabel = label => label, children, ...restProps },
  { selectly }
) => {
  const {
    value,
    selectedOptions,
    isOpen,
    toggle,
    autoWidth,
    onTriggerMeasure,
  } = selectly
  let childrenToRender

  if (typeof children === 'function') {
    childrenToRender = props =>
      children(props, {
        isOpen,
        value,
        selectedOptions,
      })
  } else if (children) {
    childrenToRender = children
  } else if (selectedOptions.length > 0) {
    childrenToRender = selectedOptions.map(o => renderLabel(o.label))
  } else {
    childrenToRender = defaultValue
  }

  const component = (
    <Target>
      {({ targetProps }) =>
        <ARIATrigger
          ref={c => {
            targetProps.ref(ReactDOM.findDOMNode(c))
          }}
          isOpen={isOpen}
          keybindings={[' ']}
          onTrigger={toggle}
          children={childrenToRender}
          {...restProps}
        />}
    </Target>
  )
  return component
}

Trigger.contextTypes = {
  selectly: PropTypes.object,
}

export default Trigger
