import React, { PropTypes } from 'react'
import { Select } from 'react-aria'

const OptionList = (props, context) => {
  const { children, ...restProps } = props
  const { selectly } = context
  const childrenToRender = typeof children === 'function'
    ? optionListProps =>
        children({
          isOpen: selectly.isOpen,
          triggerWidth: selectly.triggerWidth,
          optionListProps,
        })
    : children
  return (
    <Select.OptionList
      closeOnOutsideClick={false}
      onOptionSelection={selectly.onChange}
      onRequestClose={selectly.close}
      {...props}
    >
      {childrenToRender}
    </Select.OptionList>
  )
}

OptionList.contextTypes = {
  selectly: PropTypes.object,
}

export default OptionList
