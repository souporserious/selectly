import React, { PropTypes } from 'react'
import Portal from 'react-travel'
import { Popper } from 'react-popper'
import { Select as ARIASelect } from 'react-aria'

const Menu = ({
  renderTo,
  placement,
  children,
  ...restProps
}, {
  selectly
}) => selectly.isOpen && (
  <Portal renderTo={renderTo}>
    <ARIASelect.OptionList
      component={false}
      closeOnOutsideClick={true}
      onOptionSelection={selectly.onChange}
      onRequestClose={selectly.close}
      {...restProps}
    >
      {optionListProps =>
        <Popper
          placement={placement}
          style={{ width: selectly.triggerWidth }}
          {...optionListProps}
        >
          {children}
        </Popper>
      }
    </ARIASelect.OptionList>
  </Portal>
)

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
