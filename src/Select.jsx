import React, { Component, PropTypes, Children, cloneElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Select as ARIASelect } from 'react-aria'
import { Manager as PopperManager, Target, Popper } from 'react-popper'
import Measure from 'react-measure'
import Portal from 'react-travel'
import tabbable from 'tabbable'
import childrenPropType from './children-prop-type'

const { Manager: SelectManager } = ARIASelect

class Select extends Component {
  static propTypes = {
    multiple:        PropTypes.bool,
    disabled:        PropTypes.bool,
    autoWidth:       PropTypes.bool,
    placement:       PropTypes.any,
    renderOverlayTo: PropTypes.any,
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
    isOpen:        false,
    width:         null,
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

  _handleTrigger = (firstChild, event) => {
    this.setState(state => ({ isOpen: !state.isOpen }))

    if (typeof firstChild.props.onTrigger === 'function') {
      firstChild.props.onTrigger(event)
    }
  }

  _handleTriggerKeyDown = (firstChild, event) => {
    // determine if we need to move focus to the options menu when pressing tab
    // while the menu is open
    if (event.key === 'Tab' && this.state.isOpen) {
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

    if (typeof firstChild.props.onKeyDown === 'function') {
      firstChild.props.onKeyDown(event)
    }
  }

  _handleRequestClose(secondChild) {
    this.setOpen(false)

    if (typeof secondChild.props.onRequestClose === 'function') {
      secondChild.props.onRequestClose()
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

  render() {
    const { autoWidth, renderOverlayTo, placement, children } = this.props
    const { isOpen, width, currentOption } = this.state
    const [firstChild, secondChild] = Children.toArray(children)
    return (
      <SelectManager>
        <PopperManager>
          <Measure onMeasure={this._handleMeasure}>
            <Target component={false}>
              {cloneElement(firstChild, {
                  isOpen,
                  keybindings: [' '],
                  onTrigger:   this._handleTrigger.bind(this, firstChild),
                  onKeyDown:   this._handleTriggerKeyDown.bind(this, firstChild)
                })
              }
            </Target>
          </Measure>
          { isOpen &&
            <Portal renderTo={renderOverlayTo}>
              <Popper
                placement={placement}
                style={{ width: width ? `${width}px` : '' }}
              >
                {cloneElement(secondChild, {
                  ref:                 c => this._optionsList = c,
                  initialFocus:        currentOption.index,
                  closeOnOutsideClick: true,
                  onOptionSelection:   this._handleOptionSelection.bind(this, secondChild),
                  onRequestClose:      this._handleRequestClose.bind(this, secondChild)
                })}
              </Popper>
            </Portal>
          }
        </PopperManager>
      </SelectManager>
    )
  }
}

export default Select
