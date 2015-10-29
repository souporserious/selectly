import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Selectly from '../src/selectly'

import './main.scss'

class App extends Component {
  state = {
    currentValue: null,
    options: {[
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
    ]}
  }

  _handleChange = (currentValue) => {
    this.setState({currentValue})
  }

  render() {
    const { currentValue, options } = this.state

    return(
      <Selectly
        name="selectly"
        value={currentValue}
        options={options}
        onChange={this._handleChange}
        renderTrigger={null}
        renderHeader={null}
        renderOptions={null}
        renderOption={null}
        renderFooter={null}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));