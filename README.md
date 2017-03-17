## Selectly

Build custom select menus in React. Provides a low level way to build the select menu you need.

## Install

`npm install selectly --save`

`bower install selectly --save`

## Example Usage

```javascript
import { Select, Trigger, OptionList, Option, utils } from 'Selectly'
const { getToggledValues } = utils

class MultiSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultValue: 'Select a color',
      currentValues: []
    }
  }

  _handleChange(value) {
    this.setState({
      currentValues: getToggledValues(this.state.currentValues, value)
    })
  }

  render() {
    const { defaultValue, currentValues } = this.state
    return (
      <Select
        multiple
        onChange={value => this._handleChange(value)}
      >
        <Trigger>
          { currentValues.length > 0
            ? currentValues.join(', ')
            : defaultValue
          }
        </Trigger>
        <OptionList tag="ul" className="react-select-menu">
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
        </OptionList>
      </Select>
    )
  }
}
```

## Select Props

### `children`: PropTypes.node.isRequired (Accepts 2 children)

The first child is used as the `trigger` and the second child is used as the `options` that will be displayed upon clicking the trigger.

### `multiple`: PropTypes.bool

When `true` this allows multiple options to be selected.

### `disabled`: PropTypes.bool

Puts the select menu in a disabled state.

### `autoWidth`: PropTypes.bool

Determines if the `options` should be the same width as the `trigger`.

### `onChange`: PropTypes.func

Callback when an option has been selected. Passes back the value that was selected.

## React ARIA Components

`Trigger`, `OptionList`, and `Option` are exported directly from [React ARIA](https://github.com/souporserious/react-aria)

## Utilities

### `buildOptionsLookup`: (array options)

Returns a flat object to allow optgroup options to be accessed easier.

```javascript
[
  { label: 'Dogs', optgroup: [
    { value: 'frenchy', label: 'French Bulldog' },
    { value: 'pit-bull', label: 'Pit Bull' }
  ]},
  { label: 'Cats', optgroup: [
    { value: 'munchkin', label: 'Munchkin' },
    { value: 'persian', label: 'Persian' }
  ]}
]
```

turns into

```javascript
{
  'frenchy':  { value: 'frenchy', label: 'French Bulldog' },
  'pit-bull': { value: 'pit-bull', label: 'Pit Bull' },
  'munchkin': { value: 'munchkin', label: 'Munchkin' },
  'persian':  { value: 'persian', label: 'Persian' }
}
```

### `getAllValues`: (object options)

Returns an array of all option values.

### `getToggledValues`: (object prevValues, [array, string] nextValues)

Returns a new array of values either added or removed.

### `getCurrentOptions`: (object options, [array, string] currentValue)

Returns an array of the current option or options.

### `isOptionSelected`: ([array, string] currentValue, string value)

Determines if `value` exists in or matches `currentValue`. Returns `true` or `false`.

<br/>

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
