import React, { Component, Children, PropTypes, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import { spring } from 'react-motion'
import { Select, Trigger, Menu, OptionList, Option, utils } from '../src/selectly.js'

import '../src/selectly.scss'
import './main.scss'

const {
  buildOptionsLookup,
  getCurrentOptions,
  getToggledValues,
  getAllValues,
  isOptionSelected,
  withOptGroupProps
} = utils

// TODO:
// recreate these:
// http://tympanus.net/Development/SelectInspiration/index4.html
// accessible:
// http://www.w3.org/TR/WCAG10-HTML-TECHS/#forms

const OptGroup = withOptGroupProps(({
  title,
  children,
  isAllSelected,
  selectAll,
  deselectAll
}) => (
  <div>
    <header onClick={isAllSelected ? deselectAll : selectAll}>
      {title}
    </header>
    {children}
  </div>
))

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

  open() {
    this._select.open()
  }

  close() {
    this._select.close()
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
        multiple={multiple}
        value={value}
        onChange={onChange}
      >
        <CustomTrigger
          emptyValue={emptyValue}
          isMultiple={multiple}
          currentValue={currentOptions}
        />
        <Menu className="react-select">
          <div className="react-select-menu">
            { (selectAll || deselectAll) &&
              this._renderSelectAll()
            }
            {this._renderOptions(options)}
          </div>
        </Menu>
      </Select>
    )
  }
}

class Demo1 extends Component {
  state = {
    value: null,
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
    this._select.open()
  }

  _handleChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    const { value, options } = this.state
    return (
      <div>
        <label onClick={this._openSelectMenu}>
          Choose an animal:
        </label>
        <MySelect
          ref={c => this._select = c}
          value={value}
          options={options}
          onChange={this._handleChange}
        />
      </div>
    )
  }
}

class Demo2 extends Component {
  state = {
    value: ['the-shining', 'halloween'],
    options: [
      { value: 'the-shining', label: 'The Shining' },
      { value: 'poltergeist', label: 'Poltergeist' },
      { value: 'halloween', label: 'Halloween' },
      { value: 'pumpkinhead', label: 'Pumpkinhead' }
    ]
  }

  _handleChange = ({ value }) => {
    this.setState({ value })
  }

  _handleSelectAll = () => {
    this.setState({
      value: getAllValues(this.state.options)
    })
  }

  _handleDeselectAll = () => {
    this.setState({
      value: []
    })
  }

  render() {
    const { value, options } = this.state
    return (
      <div>
        <label>What's your favorite scary movie:</label>
        <MySelect
          emptyValue="Select A Value"
          value={value}
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
  constructor(props) {
    super(props)
    this.state = {
      defaultValue: 'Select a color',
      value: [],
      options: ['red', 'green', 'blue']
    }
  }

  _handleChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    const { defaultValue, value, options } = this.state
    return (
      <Select
        multiple
        autoWidth={false}
        value={value}
        onChange={this._handleChange}
      >
        <Trigger>
          {(props, { selectedOptions }) =>
            <button {...props} style={{ display: 'flex' }}>
              {selectedOptions.length > 0
                ? selectedOptions.map(({ label }) =>
                    <div key={label} style={{ padding: 2, margin: 2, backgroundColor: '#ccc' }}>
                      {label}
                    </div>
                  )
                : 'Select a value'
              }
            </button>
          }
        </Trigger>
        <Menu className="react-select-menu">
          <button onClick={() => this.setState({ value: options })}>
            Select All
          </button>
          <button onClick={() => this.setState({ value: [] })}>
            Deselect All
          </button>
          <button onClick={() => this.setState({ value: ['red', 'blue'] })}>
            Red & Blue
          </button>
          <OptGroup title="Colors">
            {options.map(value =>
              <Option key={value} value={value} label={value.toUpperCase()}>
                {({ props, isHighlighted, isSelected }) =>
                  <div {...props} style={{ backgroundColor: isHighlighted && '#f1f1f1' }}>
                    <input type="checkbox" checked={isSelected} readOnly/>
                    {value}
                  </div>
                }
              </Option>
            )}
          </OptGroup>
        </Menu>
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
