import React, { Component, PropTypes, createElement } from 'react'

class Option extends Component {
  static propTypes = {
    component: PropTypes.string
  }

  static defaultProps = {
    component: 'li'
  }

  static contextTypes = {
    onOptionSelect: PropTypes.func
  }

  _handleClick() {
    const { onMouseUp } = this.props

    this.context.onOptionSelect(this.props.value)

    if (typeof onMouseUp === 'function') {
      onMouseUp()
    }
  }

  render() {
    const { component, children, ...props } = this.props

    return createElement(
      component, {
        ...props,
        onMouseUp: () => this._handleClick()
      },
      children
    )
  }
}

export default Option
