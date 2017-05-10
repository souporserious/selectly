import React, { Component, PropTypes, Children, cloneElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Select as ARIASelect } from 'react-aria'
import { Manager as PopperManager } from 'react-popper'
import getToggledValues from './utils/get-toggled-values'
import isOptionSelected from './utils/is-option-selected'

const { Manager: SelectManager } = ARIASelect

const arraysEqual = (a, b) => a.sort().join(' ') === b.sort().join(' ')

const noop = () => null

class Select extends Component {
  static childContextTypes = {
    selectly: PropTypes.object,
  }

  static propTypes = {
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    autoWidth: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
  }

  static defaultProps = {
    multiple: false,
    disabled: false,
    autoWidth: true,
    onChange: noop,
  }

  state = {
    isOpen: false,
    triggerWidth: null,
    value: this.props.value,
    selectedOptions: [],
  }
  options = []

  getChildContext() {
    return {
      selectly: {
        ...this.state,
        autoWidth: this.props.autoWidth,
        multiple: this.props.multiple,
        open: this.open,
        close: this.close,
        toggle: this.toggle,
        addOption: this._addOption,
        removeOption: this._removeOption,
        onTriggerMeasure: this._handleTriggerMeasure,
        onChange: this._handleChange,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    // update any new values by comparing the current values with incoming values
    if (nextProps.value) {
      if (nextProps.value.constructor === Array) {
        if (
          (this.props.value &&
            !arraysEqual(this.props.value, nextProps.value)) ||
          (this.state.value && !arraysEqual(this.state.value, nextProps.value))
        ) {
          this._setValue(nextProps.value)
        }
      } else {
        if (
          this.props.value !== nextProps.value ||
          this.state.value !== nextProps.value
        ) {
          this._setValue(nextProps.value)
        }
      }
    }

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

  _addOption = option => {
    // store option so we can update its state
    this.options.push(option)

    // determine if this option is selected or not
    if (isOptionSelected(this.state.value, option.value)) {
      option.setSelectedState(true)
    }
  }

  _removeOption = value => {
    this.options = this.options.filter(option => option.value !== value)
  }

  _handleTriggerMeasure = ({ width }) => {
    this.setState({ triggerWidth: width })
  }

  _setValue(value, cb = noop) {
    const selectedOptions = []

    this.options.forEach(option => {
      const isSelected = isOptionSelected(value, option.value)

      option.setSelectedState(isSelected)

      if (isSelected) {
        selectedOptions.push(option)
      }
    })

    this.setState({ value, selectedOptions }, cb)
  }

  _getSelectedOptions() {
    return this.options.filter(option => option.getSelectedState())
  }

  _handleChange = option => {
    const { multiple, onChange } = this.props
    const newValue = multiple
      ? getToggledValues(this.state.value, option.value)
      : option.value

    this._setValue(newValue, () => {
      onChange({
        value: newValue,
        option: option,
        options: this.options,
        selectedOptions: this.state.selectedOptions,
      })

      if (!multiple) {
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
