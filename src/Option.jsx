import React, { Component, PropTypes, createElement } from 'react'

class Option extends Component {
  static propTypes = {
    component: PropTypes.string,
    value: PropTypes.any.isRequired
  }

  static defaultProps = {
    component: 'li'
  }

  static contextTypes = {
    onOptionSelect: PropTypes.func
  }

  _handleMouseUp() {
    const { onMouseUp, value } = this.props

    this.context.onOptionSelect(value)

    if (typeof onMouseUp === 'function') {
      onMouseUp()
    }
  }

  render() {
    const { component, children, value, index, ...props } = this.props
console.log(index)
    return createElement(
      component, {
        ...props,
        onMouseUp: () => this._handleMouseUp()
      },
      children
    )
  }
}

export default Option
