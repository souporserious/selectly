'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getAllValues;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _buildOptionsLookup = require('./build-options-lookup');

var _buildOptionsLookup2 = _interopRequireDefault(_buildOptionsLookup);

function getAllValues(options) {
  var lookup = (0, _buildOptionsLookup2['default'])(options);
  return Object.keys(lookup).map(function (key) {
    return lookup[key].value;
  });
}

module.exports = exports['default'];