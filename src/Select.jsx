import React, { Component, PropTypes, cloneElement } from 'react'
import TetherComponent from 'react-tether'
import EventsHandler from './Events-Handler'

const eventsHandler = new EventsHandler()

class Select extends Component {
  static propTypes = {
    name: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    offset: PropTypes.string,
    classPrefix: PropTypes.string,
    autoWidth: PropTypes.bool,
    renderOptions: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    name: 'S' + Math.abs(~~(Math.random() * new Date())),
    multiple: false,
    disabled: false,
    offset: '0px 0px',
    classPrefix: 'selectly',
    autoWidth: true,
    renderOptions: options => options,
    onChange: () => null
  }

  static childContextTypes = {
    onOptionSelect: PropTypes.func
  }

  state = {
    isOpen: false,
    width: null
  }

  getChildContext() {
    return {
      onOptionSelect: option => {
        if (!this.props.multiple) {
          this.setOpen(false)
        }
        this.props.onChange(option)
      }
    }
  }

  componentDidMount() {
    // set the tethered content width
    this._setWidth()

    // add component to events handler so we delegate everything to one handler
    // rather than every component instance
    eventsHandler.add(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled !== nextProps.disabled &&
        nextProps.disabled === true) {
      this.setOpen(false)
    }
  }

  componentWillUnmount() {
    eventsHandler.remove(this)
  }

  setOpen(isOpen) {
    this.setState({isOpen})
  }

  _setWidth() {
    if (this.props.autoWidth) {
      this.setState({width: this._trigger.offsetWidth})
    }
  }

  _toggleOpen({ target }) {
    if (this.props.disabled) return

    if (this._trigger.contains(target)) {
      this.setOpen(!this.state.isOpen)
    } else if (this._options && !this._options.contains(target)) {
      this.setOpen(false)
    }
  }

  render() {
    const { offset, classPrefix, autoWidth, children, renderOptions } = this.props
    const { isOpen, width } = this.state
    const firstChild = children[0]
    const secondChild = children[1]

    return (
      <TetherComponent
        attachment="top left"
        targetAttachment="bottom left"
        offset={offset}
        classPrefix={classPrefix}
        constraints={[{
          to: 'window',
          attachment: 'together'
        }]}
      >
        {
          cloneElement(firstChild, {
            ref: c => { this._trigger = c }
          })
        }
        {
          renderOptions(
            isOpen &&
            cloneElement(secondChild, {
              ref: c => { this._options = c },
              style: {
                width: width || '',
                ...secondChild.props.style
              }
            })
          )
        }
      </TetherComponent>
    )
  }
}

export default Select
