import React, { Component, Children, PropTypes, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import { spring } from 'react-motion'
import { Select, Trigger, OptionList, Option, utils } from '../src/selectly.js'

import '../src/selectly.scss'
import './main.scss'

const { buildOptionsLookup, getCurrentOptions, getToggledValues, getAllValues, isOptionSelected } = utils

// TODO:
// recreate these:
// http://tympanus.net/Development/SelectInspiration/index4.html
// accessible:
// http://www.w3.org/TR/WCAG10-HTML-TECHS/#forms

class CustomTrigger extends Component {
  _renderLabel(label) {
    return (
      <span
        key={label}
        className="react-select-trigger__option"
      >
        {label}
      </span>
    )
  }

  render() {
    const { currentValue, emptyValue, isMultiple, isDisabled, ...restProps } = this.props
    const isActive = false
    return (
      <Trigger
        className={
          'react-select-trigger' +
          (isMultiple ? ' react-select-trigger--multiple' : '') +
          (isActive ? ' react-select-trigger--active' : '') +
          (isDisabled ? ' react-select-trigger--disabled' : '')
        }
        {...restProps}
      >
        { currentValue.length > 0
          ? currentValue.map(({ label }) => this._renderLabel(label))
          : emptyValue
        }
      </Trigger>
    )
  }
}

class MySelect extends Component {
  static propTypes = {
    emptyValue:  PropTypes.any,
    value:       PropTypes.any,
    options:     PropTypes.array,
    checkbox:    PropTypes.bool,
    multiple:    PropTypes.bool,
    selectAll:   PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    deselectAll: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  }

  static defaultProps = {
    emptyValue:  '',
    checkbox:    false,
    multiple:    false,
    selectAll:   false,
    deselectAll: false
  }

  state = {
    focusedIndex: -1
  }

  setOpen(isOpen) {
    this._select.setOpen(isOpen)
  }

  _renderOption({ value, label }) {
    const hasCheckbox = this.props.checkbox
    const isSelected = isOptionSelected(this.props.value, value)
    return (
      <Option
        key={label}
        value={value}
      >
        {({ props, isHighlighted }) =>
          <div
            {...props}
            className={
              'react-select-option' +
              (hasCheckbox ? ' has-checkbox' : '') +
              (isSelected ? ' is-selected' : '')
            }
            style={{
              background: isHighlighted ? 'orange' : ''
            }}
          >
            { hasCheckbox &&
              <input
                type="checkbox"
                className="react-select-option__checkbox"
                checked={isSelected}
                readOnly
              />
            }
            {label}
          </div>
        }
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
        { options.map((option, index) => (
            option.optgroup
            ? this._renderOptGroup(option)
            : this._renderOption(option)
          ))
        }
      </ul>
    )
  }

  _renderSelectAll() {
    const { selectAll, deselectAll } = this.props
    return (
      <header className="react-select-header">
        { selectAll &&
          <button
            type="button"
            className="react-select-btn"
            onClick={() => selectAll()}
          >
            Select All
          </button>
        }
        { deselectAll &&
          <button
            type="button"
            className="react-select-btn"
            onClick={() => deselectAll()}
          >
            Deselect All
          </button>
        }
      </header>
    )
  }

  render() {
    const { value, emptyValue, options, multiple, onChange, selectAll, deselectAll } = this.props
    const currentOptions = getCurrentOptions(options, value)
    return (
      <Select
        ref={c => this._select = c}
        classPrefix="react-select"
        multiple={multiple}
        onChange={onChange}
      >
        <CustomTrigger
          emptyValue={emptyValue}
          isMultiple={multiple}
          currentValue={currentOptions}
        />
        <OptionList className="react-select-menu">
          { (selectAll || deselectAll) &&
            this._renderSelectAll()
          }
          {this._renderOptions(options)}
        </OptionList>
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

  _openSelectMenu = () => {
    this.refs.select.setOpen(true)
  }

  _handleChange = ({ value }) => {
    this.setState({ currentValue: value })
  }

  render() {
    const { currentValue, options } = this.state
    return (
      <div>
        <label onClick={this._openSelectMenu}>
          Choose an animal:
        </label>
        <MySelect
          ref="select"
          value={currentValue}
          options={options}
          onChange={this._handleChange}
        />
      </div>
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

  _handleChange = ({ value }) => {
    this.setState({
      currentValue: getToggledValues(this.state.currentValue, value)
    })
  }

  _handleSelectAll = () => {
    this.setState({
      currentValue: getAllValues(this.state.options)
    })
  }

  _handleDeselectAll = () => {
    this.setState({
      currentValue: []
    })
  }

  render() {
    const { currentValue, options } = this.state

    return (
      <div>
        <label>What's your favorite scary movie:</label>
        <MySelect
          emptyValue="Select A Value"
          value={currentValue}
          options={options}
          checkbox
          multiple
          selectAll={this._handleSelectAll}
          deselectAll={this._handleDeselectAll}
          onChange={this._handleChange}
        />
      </div>
    )
  }
}

class MultiSelect extends Component {
  state = {
    blankValue: 'Select a color',
    currentValues: []
  }

  _handleChange = ({ value }) => {
    this.setState({
      currentValues: getToggledValues(this.state.currentValues, value)
    })
  }

  render() {
    const { blankValue, currentValues } = this.state
    return (
      <Select multiple>
        <Trigger>
          { currentValues.length > 0
            ? currentValues.join(', ')
            : blankValue
          }
        </Trigger>
        <OptionList onOptionSelection={this._handleChange}>
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
        </OptionList>
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
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
