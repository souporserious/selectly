import React, { PropTypes } from 'react'
import Portal from 'react-travel'
import { Popper } from 'react-popper'
import { Select as ARIASelect } from 'react-aria'

const Menu = ({
  component,
  renderTo = document.body,
  placement,
  children,
  ...restProps
}, {
  selectly
}) => {
  const optionList = (
    <ARIASelect.OptionList
      component={false}
      closeOnOutsideClick={true}
      onOptionSelection={selectly.onChange}
      onRequestClose={selectly.close}
      {...restProps}
    >
      {optionListProps =>
        <Popper
          component={component}
          placement={placement}
          style={{ width: selectly.triggerWidth }}
          {...optionListProps}
        >
          {children}
        </Popper>
      }
    </ARIASelect.OptionList>
  )
  const componentToRender = renderTo
    ? <Portal renderTo={renderTo} children={optionList}/>
    : optionList

  return selectly.isOpen && componentToRender
}

Menu.contextTypes = {
  selectly: PropTypes.object
}

Menu.propTypes = {
  placement: PropTypes.any,
  renderTo:  PropTypes.any
}

Menu.defaultProps = {
  placement: 'bottom-start'
}

export default Menu
