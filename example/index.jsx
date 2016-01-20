import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { spring } from 'react-motion'
import Transition from 'react-motion-ui-pack'
import Selectly from '../src/selectly'

import '../src/selectly.scss'
import './main.scss'

// TODO:
// recreate these:
// http://tympanus.net/Development/SelectInspiration/index4.html
// accessible:
// http://www.w3.org/TR/WCAG10-HTML-TECHS/#forms

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

  _handleChange = (option) => {
    this.setState({currentValue: option.value})
  }

  render() {
    const { currentValue, options } = this.state

    return(
      <Selectly
        name="selectly-1"
        value={currentValue}
        options={options}
        offset="1px 0px"
        renderContent={(content, isOpen) =>
          <Transition
            enter={{opacity: spring(1, [300, 30]), scale: 1.00}}
            leave={{opacity: spring(0, [300, 30]), scale: 0.98}}
          >
            {isOpen && content}
          </Transition>
        }
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

  render() {
    const { currentValue, options } = this.state

    return(
      <Selectly
        name="selectly-2"
        value={currentValue}
        options={options}
        multiple={true}
        offset="1px 0px"
        renderFooter={closeMenu =>
          <button onClick={() => closeMenu()}>
            Done
          </button>
        }
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
        <div style={{margin: '0 0 24px'}}>
          <Demo3/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));