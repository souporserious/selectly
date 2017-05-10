import React, { PropTypes } from 'react'
import Portal from 'react-travel'
import { Popper } from 'react-popper'
import { Select } from 'react-aria'

const Menu = (props, context) => {
  const {
    component,
    renderTo,
    placement,
    style,
    children,
    ...restProps
  } = props
  const { selectly } = context
  const optionList = (
    <Select.OptionList
      component={false}
      closeOnOutsideClick={true}
      onOptionSelection={selectly.onChange}
      onRequestClose={selectly.close}
      {...restProps}
    >
      {optionListProps => (
        <Popper
          component={component}
          placement={placement}
          style={{ width: selectly.triggerWidth, ...style }}
          {...optionListProps}
        >
          {children}
        </Popper>
      )}
    </Select.OptionList>
  )
  const componentToRender = renderTo
    ? <Portal renderTo={renderTo} children={optionList} />
    : optionList

  return selectly.isOpen && componentToRender
}

Menu.contextTypes = {
  selectly: PropTypes.object,
}

Menu.propTypes = {
  placement: PropTypes.any,
  renderTo: PropTypes.any,
}

Menu.defaultProps = {
  placement: 'bottom-start',
  renderTo: document.body,
}

export default Menu
