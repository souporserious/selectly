import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import TetherElement from 'react-tether'
import EventsHandler from './Events-Handler'

const eventsHandler = new EventsHandler()
const defaultTrigger = (currentOptions, isActive, isDisabled) => {
  const isMultiple = (currentOptions.constructor === Array)

  if (!isMultiple) {
    currentOptions = [currentOptions]
  }

  return (
    <button
      type="button"
      className={
        'react-select__trigger' +
        (isMultiple ? ' react-select__trigger--multiple' : '') +
        (isActive ? ' react-select__trigger--active' : '') +
        (isDisabled ? ' react-select__trigger--disabled' : '')
      }
    >
      {currentOptions.map(currentOption =>
        <span
          key={currentOption.label}
          className="react-select__trigger__option"
        >
          {currentOption.label}
        </span>
      )}
      <svg
        width="21px"
        height="21px"
        viewBox="0 0 21 21"
        className="react-select__trigger__arrow"
      >
        <polygon points="10.5,12 7,8.5 14,8.5"/>
      </svg>
    </button>
  )
}
const defaultContent = (content, isOpen) => {
  return (
    isOpen ? content : <span/>
  )
}
const defaultOption = ({value, label, onSelect}, nestedOptions, level) => {
  return (
    <li
      key={value || label}
      className={
        (nestedOptions ? 'react-select__optgroup' : 'react-select__option')
      }
      onClick={!nestedOptions && onSelect}
    >
      {
        !nestedOptions ?
        <div
          title={typeof label === 'string' && label || ''}
          className="react-select__option__label"
        >
          {label}
        </div> :
        <strong
          title={label}
          className="react-select__optgroup__title"
        >
          {label}
        </strong>
      } {
        nestedOptions &&
        <ul className={`react-select__options react-select__options--${level}`}>
          {nestedOptions}
        </ul>
      }
    </li>
  )
}
const noopFunc = () => null

class Selectly extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.array,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    offset: PropTypes.string,
    autoWidth: PropTypes.bool,
    renderTrigger: PropTypes.func,
    renderContent: PropTypes.func,
    renderOption: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    //name: this._id, // use uuid if no name for aria labels
    value: null,
    options: [],
    multiple: false,
    disabled: false,
    offset: '0px 0px',
    autoWidth: true,
    renderTrigger: defaultTrigger,
    renderContent: defaultContent,
    renderOption: defaultOption,
    renderHeader: noopFunc,
    renderFooter: noopFunc,
    onChange: noopFunc
  }

  state = {
    isOpen: false,
    width: 0
  }

  _id = 'S' + Math.abs(~~(Math.random() * new Date()))
  _firstOption = null
  _lookup = this._buildLookup(this.props.options)

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentDidMount() {
    // set the tethered content width
    this._setWidth()

    // add component to events handler so we delegate everything to one handler
    // rather than every component instance
    eventsHandler.add(this)
  }

  componentWillReceiveProps(nextProps) {
    this._lookup = this._buildLookup(nextProps.options)

    if (this.props.disabled !== nextProps.disabled &&
        nextProps.disabled === true) {
      this._setOpen(false)
    }
  }

  componentWillUnmount() {
    eventsHandler.remove(this)
  }

  _setOpen(isOpen) {
    this.setState({isOpen})

    // enable / disable tethered content
    if (isOpen) {
      this.refs.tether.enable()
    } else {
      this.refs.tether.disable()
    }
  }

  _setWidth() {
    if (this.props.autoWidth) { 
      this.setState({width: this.refs.trigger.offsetWidth})
    }
  }

  _toggleOpen(e) {
    if (this.props.disabled) return

    if (this.refs.trigger.contains(e.target)) {
      this._setOpen(!this.state.isOpen)
    } else if (this.refs.drop && !this.refs.drop.contains(e.target)) {
      this._setOpen(false)
    }
  }

  _buildLookup(options, _lookup = {}) {
    const len = options.length

    for (let i = 0; i < len; i++) {
      const option = options[i]
      const { optgroup, value, label } = option

      if (optgroup) {
        this._buildLookup(optgroup, _lookup)
      } else {
        const option = options[i]

        // store in lookup so we can retrieve the selected option
        _lookup[value] = option

        // if the first option store it so we can access it
        // for the current value, this way we don't have to
        // worry about transforming the object into an array
        if (!this._firstOption) {
          this._firstOption = option
        }
      }
    }
    return _lookup
  }

  _getCurrentOption() {
    const { value } = this.props
    let option = null

    // if no value provided return the first option
    if (!value) {
      option = this._firstOption
    // if an array we return an array of the selected options back
    } else if (value.constructor === Array) {
      option = value.map(currValue =>
        this._lookup[currValue]
      )
    // otherwise just return the single selected option
    } else {
      option = this._lookup[value]
    }

    return option
  }

  _handleOptionClick = (option) => {
    this.props.onChange(option)

    if (!this.props.multiple) {
      this._setOpen(false)

      // for some reason tether won't get disabled on an option click,
      // this works for now, but need to look into fixing it
      setTimeout(() => {
        this.refs.tether.disable()
      }, 0)
    } else {

    }
  }

  _renderTrigger(currentOption, isActive, isDisabled) {
    return this.props.renderTrigger(currentOption, isActive, isDisabled)
  }

  _renderHeader() {
    const closeMenu = () => this._setOpen(false)
    return this.props.renderHeader(closeMenu)
  }

  _renderOption(option, level = 0) {
    const { value, label, optgroup } = option
    let nestedOptions = null

    // check if nested options passed in
    if (optgroup) {
      level++
      nestedOptions = optgroup.map(nestedOption =>
        this._renderOption(nestedOption, level)
      )
    }

    return this.props.renderOption(
      { ...option, onSelect: this._handleOptionClick.bind(null, option) },
      nestedOptions,
      level
    )
  }

  _renderFooter() {
    const closeMenu = () => this._setOpen(false)
    return this.props.renderFooter(closeMenu)
  }

  render() {
    const { modifier, options, disabled, offset, wrapper, autoWidth } = this.props
    const { isOpen, width } = this.state
    const currentOption = this._getCurrentOption()
    let triggerClassName = 'react-select'
    let dropClassName = 'react-select-drop'
    let triggerStyle = {}
    let dropStyle = {} 

    if (modifier) {
      triggerClassName += ` ${triggerClassName}--${name}`
      dropClassName += ` ${dropClassName}--${name}`
    }

    if (autoWidth) {
      dropStyle = { width }
    }

    return (
      <div ref="trigger" className={triggerClassName}>
        {this._renderTrigger(currentOption, isOpen, disabled)}
        <TetherElement
          ref="tether"
          target={this.refs.trigger}
          options={{
            attachment: 'top left',
            targetAttachment: 'bottom left',
            offset,
            classPrefix: 'react-select',
            constraints: [{
              to: 'window',
              attachment: 'together'
            }]
          }}
        >
          {this.props.renderContent(
            <div
              ref="drop"
              className={dropClassName}
              style={dropStyle}
            >
              {this._renderHeader()}
              <ul className="react-select__options">
                {options.map(option =>
                  this._renderOption(option)
                )}
              </ul>
              {this._renderFooter()}
            </div>,
            isOpen
          )}
        </TetherElement>
      </div>
    )
  }
}

export default Selectly