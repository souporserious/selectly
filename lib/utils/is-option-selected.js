"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isOptionSelected;

function isOptionSelected(currentValue, value) {
  if (!value || !currentValue) {
    return false;
  } else {
    if (currentValue.constructor === Array) {
      return currentValue.indexOf(value) > -1;
    } else {
      return value === currentValue;
    }
  }
}

module.exports = exports["default"];