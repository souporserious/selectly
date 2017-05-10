import React, { Component, PropTypes, createElement } from 'react'

export default function withOptGroupProps(WrappedComponent) {
  return class extends Component {
    static childContextTypes = {
      optgroup: PropTypes.object,
    }

    state = { isAllSelected: false }

    options = []

    getChildContext() {
      return {
        optgroup: {
          addOption: this._addOption,
          removeOption: this._removeOption,
          // onChange: this
        },
      }
    }

    _addOption = option => {
      this.options.push(option)
    }

    _removeOption = value => {
      this.options = this.options.filter(option => option.value !== value)
    }

    _isAllSelected() {
      this.setState({
        isAllSelected: this.options.every(option => option.getSelectedState()),
      })
    }

    selectAll = () => {
      this.options.forEach(option => option.setSelectedState(true))
      this.setState({ isAllSelected: true })
    }

    deselectAll = () => {
      this.options.forEach(option => option.setSelectedState(false))
      this.setState({ isAllSelected: false })
    }

    render() {
      return createElement(WrappedComponent, {
        ...this.props,
        isAllSelected: this.state.isAllSelected,
        selectAll: this.selectAll,
        deselectAll: this.deselectAll,
      })
    }
  }
}
