'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getCurrentOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _buildOptionsLookup = require('./build-options-lookup');

var _buildOptionsLookup2 = _interopRequireDefault(_buildOptionsLookup);

function getCurrentOptions(options, currentValue) {
  var lookup = (0, _buildOptionsLookup2['default'])(options);

  // if no value provided return the first option
  if (!currentValue) {
    return new Array(lookup[Object.keys(lookup)[0]]);
    // if an array we return an array of the selected options back
  } else if (currentValue.constructor === Array) {
      return currentValue.map(function (_value) {
        return lookup[_value];
      });
      // otherwise just return the single selected option
    } else {
        return new Array(lookup[currentValue]);
      }
}

module.exports = exports['default'];