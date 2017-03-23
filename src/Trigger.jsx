import React, { PropTypes } from 'react'
import { Target } from 'react-popper'
import { Trigger as ARIATrigger } from 'react-aria'
import Measure from 'react-measure'

const Trigger = ({ onTrigger, children, ...restProps }, { selectly }) => {
  const component = (
    <Target component={false}>
      <ARIATrigger
        isOpen={selectly.isOpen}
        keybindings={[' ']}
        onTrigger={selectly.toggle}
        children={typeof children === 'function'
          ? props => children(props, {
              isOpen: selectly.isOpen,
              currentOptions: selectly.currentOptions
            })
          : children
        }
        {...restProps}
      />
    </Target>
  )
  return selectly.autoWidth
    ? <Measure
        onMeasure={selectly.onTriggerMeasure}
        children={component}
      />
    : component
}

Trigger.contextTypes = {
  selectly: PropTypes.object
}

export default Trigger
