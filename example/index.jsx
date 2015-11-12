import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Selectly from '../src/selectly'

import '../src/selectly.scss'
import './main.scss'

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
        onChange={this._handleChange}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));