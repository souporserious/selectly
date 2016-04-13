## Selectly

Build custom, accessible, select menus in React. Provides a low level way to build the select menu you need.

## Install

`npm install selectly --save`

`bower install selectly --save`

## Example Usage

```javascript
import { Select, Option, utils } from 'Selectly'

class SimpleSelect extends Component {
  state = {
    currentValue: 'Select A Color'
  }

  render() {
    return (
      <Select onChange={value => this.setState({ currentValue: value })}>
        <button>
          {this.state.currentValue}
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
```

## Select Props

### `children`: PropTypes.node.isRequired (Accepts 2 children)

The first child is used as the `trigger` and the second child is used as the `options` that will be displayed upon clicking the trigger.

### `multiple`: PropTypes.bool

When `true` this allows multiple options to be selected.

### `disabled`: PropTypes.bool

Puts the select menu in a disabled state.

### `offset`: PropTypes.string

The amount the `options` are offset from the `trigger`.

### `classPrefix`: PropTypes.string

Defaults to `selectly`.

### `autoWidth`: PropTypes.bool

Determines if the `options` should be the same width as the `trigger`.

### `renderOptions`: PropTypes.func

Prop function that passes in the options to be rendered. Allows the use of a custom animation using something like `CSSTranstionGroup`.

### `onChange`: PropTypes.func

Callback when an option has been selected. Passes back the value that was selected.

## Option Props

### `component`: PropTypes.string

What element is used to display an option. Defaults to `li`.

### `value`: PropTypes.any.isRequired

A value of any kind is required for each option. This is what gets passed to the `onChange` callback in the `Select` component.

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
