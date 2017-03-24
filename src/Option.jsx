import React, { Component, PropTypes } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Select } from 'react-aria'

class Option extends Component {
  static contextTypes = {
    selectly: PropTypes.object
  }

  state = {
    isSelected: false
  }

  componentDidMount() {
    this.context.selectly.addOption({
      value: this.props.value,
      node: findDOMNode(this),
      setSelected: this.setSelected,
      getSelected: this.getSelected
    })
  }

  componentWillUnmount() {
    this.context.selectly.removeOption(this.props.value)
  }

  setSelected = (isSelected) => {
    this.setState({ isSelected })
  }

  getSelected = () => {
    return this.state.isSelected
  }

  render() {
    const { children, ...restProps } = this.props
    const { isSelected } = this.state
    return (
      <Select.Option {...restProps}>
        {typeof children === 'function'
          ? props => children({ ...props, isSelected })
          : children
        }
      </Select.Option>
    )
  }
}

export default Option
