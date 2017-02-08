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
    width: null,
    currentOption: {}
  }

  componentWillReceiveProps(nextProps) {
    // if there is an incoming disabled prop we need to make sure the options get closed
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

    const { isOpen } = this.state

    // toggle isOpen
    this.setOpen(!isOpen)

    // if we toggled the trigger while open then fire an on change with the
    // currently selected member
    if (isOpen) {
      const currentOption = this._optionsList.getActiveMember()
      this.setState({ currentOption })
      this.props.onChange(currentOption)
    }

    // still onTrigger to be used like normal
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
        const tabbableChildren = tabbable(findDOMNode(this._optionsList))
        if (tabbableChildren.length) {
          tabbableChildren[0].focus()
        } else {
          this.setOpen(false)
        }
      })
    }
  }

  _handleOptionSelection(secondChild, option, event) {
    if (!this.props.multiple) {
      this.setOpen(false)
    }

    // fire our own "onChange" when an option has been selected
    this.props.onChange(option)

    // store current option for initialFocus
    this.setState({ currentOption: option })

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
    const { isOpen, width, currentOption } = this.state
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
                isOpen,
                keybindings: [' '],
                onTrigger: this._handleToggle.bind(this, firstChild),
                onKeyDown: this._handleTriggerKeyDown
              })
            }
          </Measure>
          { isOpen &&
            cloneElement(secondChild, {
              ref: c => this._optionsList = c,
              initialFocus: currentOption.index,
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
