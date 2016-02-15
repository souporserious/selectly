import React, { Component, PropTypes, createElement } from 'react'

class Option extends Component {
  static propTypes = {
    component: PropTypes.string
  }

  static defaultProps = {
    component: 'div'
  }

  static contextTypes = {
    onOptionSelect: PropTypes.func
  }

  _handleClick() {
    const { onClick } = this.props

    this.context.onOptionSelect(this.props.value)

    if (typeof onClick === 'function') {
      onClick()
    }
  }

  render() {
    const { component, children, ...props } = this.props

    return createElement(
      component, {
        ...props,
        onClick: () => this._handleClick()
      },
      children
    )
  }
}

export default Option
