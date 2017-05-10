import React, { Component, PropTypes } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Select } from 'react-aria'

class Option extends Component {
  static contextTypes = {
    selectly: PropTypes.object,
    optgroup: PropTypes.object,
  }

  state = {
    isSelected: false,
  }

  componentDidMount() {
    const { selectly, optgroup } = this.context
    const option = {
      value: this.props.value,
      label: this.props.label || this.props.value,
      node: findDOMNode(this),
      setSelectedState: this.setSelectedState,
      getSelectedState: this.getSelectedState,
    }

    selectly.addOption(option)

    if (optgroup) {
      optgroup.addOption(option)
    }
  }

  componentWillUnmount() {
    this.context.selectly.removeOption(this.props.value)
  }

  setSelectedState = isSelected => {
    this.setState({ isSelected })
  }

  getSelectedState = () => {
    return this.state.isSelected
  }

  render() {
    const { multiple: isMultiple } = this.context.selectly
    const { children, ...restProps } = this.props
    const { isSelected } = this.state
    return (
      <Select.Option {...restProps}>
        {typeof children === 'function'
          ? props => children({ ...props, isMultiple, isSelected })
          : children}
      </Select.Option>
    )
  }
}

export default Option
