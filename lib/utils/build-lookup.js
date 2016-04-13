"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buildLookup;

function buildLookup(options) {
  var _lookup = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  for (var i = 0, len = options.length; i < len; i++) {
    var option = options[i];
    var optgroup = option.optgroup;
    var value = option.value;
    var label = option.label;

    if (optgroup) {
      buildLookup(optgroup, _lookup);
    } else {
      _lookup[value] = options[i];
    }
  }
  return _lookup;
}

module.exports = exports["default"];