## CHANGELOG
### 0.7.0
Upgrade to latest `react-popper` and `react-travel`

`onChange` now returns an object with `value`, `option`, `options`, and `selectedOptions`

`Select` holds an internal state of options now

`Option` accepts a child function that provides an object with `props`, `isHighlighted`, `isMultiple`, `isSelected`

### 0.6.0
Split components into `Select`, `Trigger`, `Menu`, and `Option` to allow better composition

### 0.5.0
Replaced parts with React ARIA where applicable

Added better documentation

Breaking Changes:

Added mandatory components `Trigger`, `OptionList`, and `Option`

### 0.4.0

Finished and documented utilities.

Renamed utilities:

`build-lookup` -> `build-options-lookup`

`get-option` -> `get-current-options`

`multiple-options` -> `get-toggled-options`

### 0.3.0
Updated to React Tether 0.5.1

Auto width is now applied to the React Tether component

### 0.2.0
Complete rebuild using context that provides a `Select` and `Option` components to build custom select menus.

### 0.1.2
Added `nativeSelect` prop that is true by default, use with `name` prop to get values from selected options

### 0.1.1

Better support for `multiple` prop

Fixed `shallowCompare` not getting packaged in dist

### 0.1.0

Initial working release

### 0.0.1

Nothing working yet, just setting up everything
