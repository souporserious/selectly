## Selectly 0.1.0

Build custom, accessible, select menus in React.

## Install

`npm install selectly --save`

`bower install selectly --save`

## Example Usage

```javascript
import Selectly from 'selectly';

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
        renderTrigger={}
        renderHeader={}
        renderOptions={}
        renderOption={}
        renderFooter={}
      />
    )
  }
}
```

## Run Example

clone repo

`git clone git@github.com:souporserious/selectly.git`

move into folder

`cd ~/selectly`

install dependencies

`npm install`

run dev mode

`npm run dev`

open your browser and visit: `http://localhost:8080/`
