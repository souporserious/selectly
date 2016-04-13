'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getOption;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _buildLookup = require('./build-lookup');

var _buildLookup2 = _interopRequireDefault(_buildLookup);

function getOption(value, options) {
  var lookup = (0, _buildLookup2['default'])(options);

  // if no value provided return the first option
  if (!value) {
    return lookup[Object.keys(lookup)[0]];
    // if an array we return an array of the selected options back
  } else if (value.constructor === Array) {
      return value.map(function (_value) {
        return lookup[_value];
      });
      // otherwise just return the single selected option
    } else {
        return lookup[value];
      }
}

module.exports = exports['default'];