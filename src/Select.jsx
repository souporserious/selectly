import React, { Component, PropTypes, Children, cloneElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Select as ReactARIASelect } from 'react-aria'
import TetherComponent from 'react-tether'
import Measure from 'react-measure'
import tabbable from 'tabbable'
import childrenPropType from './children-prop-type'

const { Manager } = ReactARIASelect

class Select extends Component {
  static propTypes = {
    name: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    offset: PropTypes.string,
    classPrefix: PropTypes.string,
    autoWidth: PropTypes.bool,
    onChange: PropTypes.func,
    children: childrenPropType
  }

  static defaultProps = {
    name: 'S' + Math.abs(~~(Math.random() * new Date())),
    multiple: false,
    disabled: false,
    offset: '0px 0px',
    classPrefix: 'selectly',
    autoWidth: true,
    onChange: () => null
  }

  state = {
    isOpen: false,
    width: null
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled !== nextProps.disabled &&
        nextProps.disabled === true) {
      this.setOpen(false)
    }
  }

  setOpen(isOpen, cb = () => null) {
    this.setState({ isOpen }, cb)
  }

  get isOpen() {
    return this.state.isOpen
  }

  _handleMeasure = ({ width }) => {
    if (this.props.autoWidth) {
      this.setState({ width })
    }
  }

  _handleToggle(firstChild, e) {
    if (this.props.disabled) return

    this.setOpen(!this.state.isOpen)

    if (typeof firstChild.props.onTrigger === 'function') {
      firstChild.props.onTrigger(e)
    }
  }

  _handleTriggerKeyDown = ({ key }) => {
    // determine if we need to move focus to the options menu when pressing tab
    // while the menu is open
    if (key === 'Tab' && this.state.isOpen) {
      // without setTimeout it will focus the second tabbable item, need to figure
      // out why this is happening
      setTimeout(() => {
        const tabbableChildren = tabbable(this._options)
        if (tabbableChildren.length) {
          tabbableChildren[0].focus()
        }
      })
    }
  }

  _handleOptionSelection(secondChild, option, event) {
    if (!this.props.multiple) {
      this.setOpen(false)
    }

    if (typeof secondChild.props.onOptionSelection === 'function') {
      secondChild.props.onOptionSelection(option, event)
    }
  }

  _handleRequestClose(secondChild) {
    this.setOpen(false)

    if (typeof secondChild.props.onRequestClose === 'function') {
      secondChild.props.onRequestClose()
    }
  }

  render() {
    const { offset, classPrefix, autoWidth, children } = this.props
    const { isOpen, width } = this.state
    const [firstChild, secondChild] = Children.toArray(children)
    return (
      <Manager>
        <TetherComponent
          attachment="top left"
          targetAttachment="bottom left"
          offset={offset}
          classPrefix={classPrefix}
          constraints={[{
            to: 'window',
            attachment: 'together'
          }]}
          style={{ width: width ? `${width}px` : '' }}
        >
          <Measure onMeasure={this._handleMeasure}>
            { cloneElement(firstChild, {
                ref: c => this._trigger = findDOMNode(c),
                isOpen,
                keybindings: isOpen ? [] : [' '],
                onTrigger: this._handleToggle.bind(this, firstChild),
                onKeyDown: this._handleTriggerKeyDown
              })
            }
          </Measure>
          { isOpen &&
            cloneElement(secondChild, {
              ref: c => this._options = findDOMNode(c),
              closeOnOutsideClick: true,
              onOptionSelection: this._handleOptionSelection.bind(this, secondChild),
              onRequestClose: this._handleRequestClose.bind(this, secondChild)
            })
          }
        </TetherComponent>
      </Manager>
    )
  }
}

export default Select
