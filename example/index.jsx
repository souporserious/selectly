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
        name="selectly"
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
    currentValue: ['dog', 'cat'],
    options: [
      { value: 'dog', label: 'Dog' },
      { value: 'cat', label: 'Cat' },
      { value: 'it', label: 'It' }
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
        name="selectly"
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
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));