"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getToggledOptions;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function getToggledOptions(options, values) {
  var newOptions = [].concat(_toConsumableArray(options));

  if (values.constructor !== Array) {
    values = [values];
  }

  values.forEach(function (value) {
    var pos = newOptions.indexOf(value);

    if (pos > -1) {
      newOptions.splice(pos, 1);
    } else {
      newOptions.push(value);
    }
  });

  return newOptions;
}

module.exports = exports["default"];