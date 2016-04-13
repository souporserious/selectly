import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { spring } from 'react-motion'
import { Select, Option, utils } from '../src/selectly.js'

import '../src/selectly.scss'
import './main.scss'

const { buildLookup, getOption, multipleOptions } = utils

// TODO:
// recreate these:
// http://tympanus.net/Development/SelectInspiration/index4.html
// accessible:
// http://www.w3.org/TR/WCAG10-HTML-TECHS/#forms

class Trigger extends Component {
  static contextTypes = {
    isOpen: PropTypes.bool
  }

  render() {
    let { currentOptions, isDisabled } = this.props
    const isMultiple = (currentOptions.constructor === Array)
    const isActive = this.context.isOpen

    if (!isMultiple) {
      currentOptions = [currentOptions]
    }

    return (
      <button
        type="button"
        className={
          'react-select-trigger' +
          (isMultiple ? ' react-select-trigger--multiple' : '') +
          (isActive ? ' react-select-trigger--active' : '') +
          (isDisabled ? ' react-select-trigger--disabled' : '')
        }
      >
        {currentOptions.map(currentOption =>
          <span
            key={currentOption.label}
            className="react-select-trigger__option"
          >
            {currentOption.label}
          </span>
        )}
        <svg
          width="21px"
          height="21px"
          viewBox="0 0 21 21"
          className="react-select-trigger__arrow"
        >
          <polygon points="10.5,12 7,8.5 14,8.5"/>
        </svg>
      </button>
    )
  }
}

class MySelect extends Component {
  defaultProps = {
    multiple: false
  }

  _renderOption({ value, label }) {
    return (
      <Option
        key={label}
        value={value}
        className="react-select-option"
      >
        {label}
      </Option>
    )
  }

  _renderOptGroup({ label, optgroup }) {
    return (
      <li key={label} className="react-select-optgroup">
        <strong
          title={label}
          className="react-select-optgroup__title"
        >
          {label}
        </strong>
        {this._renderOptions(optgroup)}
      </li>
    )
  }

  _renderOptions(options) {
    return (
      <ul className="react-select-options">
        {options.map(option =>
          option.optgroup ?
          this._renderOptGroup(option) :
          this._renderOption(option)
        )}
      </ul>
    )
  }

  render() {
    const { value, options, multiple, onChange } = this.props
    const currentOption = getOption(value, options)

    return (
      <Select
        ref="select"
        classPrefix="react-select"
        multiple={multiple}
        onChange={onChange}
      >
        <Trigger currentOptions={currentOption} />
        {this._renderOptions(options)}
      </Select>
    )
  }
}

class Demo1 extends Component {
  state = {
    currentValue: null,
    options: [
      { label: 'Dogs', optgroup: [
        { value: 'beagle', label: 'Beagle' },
        { value: 'boxer', label: 'Boxer' },
        { value: 'frenchy', label: 'French Bulldog' },
        { value: 'pit-bull', label: 'Pit Bull' }
      ]},
      { label: 'Cats', optgroup: [
        { value: 'bengal', label: 'Bengal' },
        { value: 'egyptian', label: 'Egyptian' },
        { value: 'munchkin', label: 'Munchkin' },
        { value: 'persian', label: 'Persian' }
      ]}
    ]
  }

  _handleChange = (value) => {
    this.setState({currentValue: value})
  }

  render() {
    const { currentValue, options } = this.state

    return (
      <MySelect
        value={currentValue}
        options={options}
        onChange={this._handleChange}
      />
    )
  }
}

class Demo2 extends Component {
  state = {
    currentValue: ['the-shining', 'halloween'],
    options: [
      { value: 'the-shining', label: 'The Shining' },
      { value: 'poltergeist', label: 'Poltergeist' },
      { value: 'halloween', label: 'Halloween' },
      { value: 'pumpkinhead', label: 'Pumpkinhead' }
    ]
  }

  _handleChange = (value) => {
    let currentValue = this.state.currentValue.slice(0)
    let pos = currentValue.indexOf(value)

    if (pos > -1) {
      currentValue.splice(pos, 1)
    } else {
      currentValue.push(value)
    }

    this.setState({currentValue})
  }

  render() {
    const { currentValue, options } = this.state

    return (
      <MySelect
        value={currentValue}
        options={options}
        multiple
        onChange={this._handleChange}
      />
    )
  }
}

class Demo3 extends Component {
  state = {
    currentValue: ['the-shining', 'halloween'],
    options: [
      { value: 'the-shining', label: 'The Shining' },
      { value: 'poltergeist', label: 'Poltergeist' },
      { value: 'halloween', label: 'Halloween' },
      { value: 'pumpkinhead', label: 'Pumpkinhead' }
    ]
  }

  _handleChange = (option) => {
    let currentValue = this.state.currentValue.slice(0)
    let pos = currentValue.indexOf(option.value)
    let value = null

    if (pos > -1) {
      currentValue.splice(pos, 1)
    } else {
      currentValue.push(option.value)
    }

    this.setState({currentValue})
  }

  _handleOption = ({value, label, onSelect}) => {
    const isSelected = this.state.currentValue.indexOf(value) > -1

    return (
      <li
        key={value}
        className="react-select__option"
        onClick={onSelect}
      >
        <div className="react-select__option__label">
          {isSelected ? <span>✓</span> : <span>&nbsp;&nbsp;</span>} {label}
        </div>
      </li>
    )
  }

  render() {
    const { currentValue, options } = this.state

    return(
      <Selectly
        name="selectly-3"
        value={currentValue}
        options={options}
        multiple={true}
        offset="1px 0px"
        renderTrigger={(currentOptions, isActive) =>
          <button
            role="button"
            style={{
              border: 0,
              color: isActive ? '#fff' : '',
              background: isActive ? '#636363' : '#E2E2E2'
            }}
          >
            Custom Trigger
          </button>
        }
        renderOption={this._handleOption}
        onChange={this._handleChange}
      />
    )
  }
}

class MultiSelect extends Component {
  state = {
    defaultValue: 'Select a color',
    currentValues: []
  }

  _handleChange = (value) => {
    this.setState({
      currentValues: multipleOptions(this.state.currentValues, value)
    })
  }

  render() {
    const { defaultValue, currentValues } = this.state
    return (
      <Select multiple onChange={this._handleChange}>
        <button>
          { currentValues.length > 0
            ? currentValues
            : defaultValue
          }
        </button>
        <ul>
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
        </ul>
      </Select>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <div style={{margin: '0 0 24px'}}>
          <Demo1/>
        </div>
        <div style={{margin: '0 0 24px'}}>
          <Demo2/>
        </div>
        <MultiSelect/>
        {/*<div style={{margin: '0 0 24px'}}>
          <Demo3/>
        </div>*/}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
