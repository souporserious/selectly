'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = childrenPropType;

var _react = require('react');

function childrenPropType(_ref, propName, componentName) {
  var children = _ref.children;

  if (_react.Children.count(children) <= 1) {
    return new Error(componentName + ' requires two children, the first child as the trigger and the second child as the set of options.');
  }
}

module.exports = exports['default'];