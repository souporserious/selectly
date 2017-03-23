import React, { Component, PropTypes, Children, cloneElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Select as ARIASelect } from 'react-aria'
import { Manager as PopperManager } from 'react-popper'
import childrenPropType from './children-prop-type'

const { Manager: SelectManager } = ARIASelect

class Select extends Component {
  static childContextTypes = {
    selectly: PropTypes.object
  }

  static propTypes = {
    multiple:        PropTypes.bool,
    disabled:        PropTypes.bool,
    autoWidth:       PropTypes.bool,
    onChange:        PropTypes.func,
    children:        childrenPropType
  }

  static defaultProps = {
    multiple:  false,
    disabled:  false,
    autoWidth: true,
    onChange:  () => null
  }

  state = {
    isOpen:         false,
    triggerWidth:   null,
    currentOptions: []
  }

  getChildContext() {
    return {
      selectly: {
        ...this.state,
        autoWidth:        this.props.autoWidth,
        open:             this.open,
        close:            this.close,
        toggle:           this.toggle,
        onTriggerMeasure: this._handleTriggerMeasure,
        onChange:         this._handleChange
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // if there is an incoming disabled prop we need to make sure the options get closed
    if (
      this.props.disabled !== nextProps.disabled &&
      nextProps.disabled === true
    ) {
      this.close()
    }
  }

  open = () => {
    this.setState({ isOpen: true })
  }

  close = () => {
    this.setState({ isOpen: false })
  }

  toggle = () => {
    this.setState(state => ({ isOpen: !state.isOpen }))
  }

  _handleTriggerMeasure = ({ width }) => {
    this.setState({ triggerWidth: width })
  }

  _handleChange = (option) => {
    this.setState(state => {
      const currentOptions = [...state.currentOptions]
      const index = currentOptions.indexOf(option)

      // toggle the incoming option
      if (index > -1) {
        currentOptions.splice(index, 1)
      } else {
        currentOptions.push(option)
      }

      // fire a callback with the option just selected as well as all currentOptions
      this.props.onChange(option, currentOptions)

      // finally, update state with the new options
      return { currentOptions }
    }, () => {
      // if this is not a multiple select we close the popover after selection
      if (!this.props.multiple) {
        this.close()
      }
    })
  }

  render() {
    const {
      multiple,
      disabled,
      autoWidth,
      onChange,
      children,
      ...restProps
    } = this.props
    return (
      <SelectManager component={false}>
        <PopperManager {...restProps}>
          {children}
        </PopperManager>
      </SelectManager>
    )
  }
}

export default Select
