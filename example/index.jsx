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

class App extends Component {
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
        //multiple={true}
        offset="1px 0px"
        renderContent={content =>
          <Transition
            enter={{opacity: spring(1, [300, 30]), scale: 1}}
            leave={{opacity: spring(0, [300, 30]), scale: 1.02}}
          >
            {content}
          </Transition>
        }
        onChange={this._handleChange}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));