(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("TetherComponent"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "TetherComponent"], factory);
	else if(typeof exports === 'object')
		exports["Selectly"] = factory(require("React"), require("ReactDOM"), require("TetherComponent"));
	else
		root["Selectly"] = factory(root["React"], root["ReactDOM"], root["TetherComponent"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsBuildOptionsLookup = __webpack_require__(1);

	var _utilsBuildOptionsLookup2 = _interopRequireDefault(_utilsBuildOptionsLookup);

	var _utilsGetCurrentOptions = __webpack_require__(2);

	var _utilsGetCurrentOptions2 = _interopRequireDefault(_utilsGetCurrentOptions);

	var _utilsGetToggledOptions = __webpack_require__(3);

	var _utilsGetToggledOptions2 = _interopRequireDefault(_utilsGetToggledOptions);

	var _utilsGetAllValues = __webpack_require__(4);

	var _utilsGetAllValues2 = _interopRequireDefault(_utilsGetAllValues);

	var _utilsIsOptionSelected = __webpack_require__(5);

	var _utilsIsOptionSelected2 = _interopRequireDefault(_utilsIsOptionSelected);

	var _Select = __webpack_require__(6);

	exports.Select = _interopRequire(_Select);

	var _Option = __webpack_require__(12);

	exports.Option = _interopRequire(_Option);
	var utils = {
	  buildOptionsLookup: _utilsBuildOptionsLookup2['default'],
	  getCurrentOptions: _utilsGetCurrentOptions2['default'],
	  getToggledOptions: _utilsGetToggledOptions2['default'],
	  getAllValues: _utilsGetAllValues2['default'],
	  isOptionSelected: _utilsIsOptionSelected2['default']
	};
	exports.utils = utils;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = buildOptionsLookup;

	function buildOptionsLookup(options) {
	  var _lookup = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  for (var i = 0, len = options.length; i < len; i++) {
	    var option = options[i];
	    var optgroup = option.optgroup;
	    var value = option.value;
	    var label = option.label;

	    if (optgroup) {
	      buildOptionsLookup(optgroup, _lookup);
	    } else {
	      _lookup[value] = options[i];
	    }
	  }
	  return _lookup;
	}

	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getCurrentOptions;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _buildOptionsLookup = __webpack_require__(1);

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

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getAllValues;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _buildOptionsLookup = __webpack_require__(1);

	var _buildOptionsLookup2 = _interopRequireDefault(_buildOptionsLookup);

	function getAllValues(options) {
	  var lookup = (0, _buildOptionsLookup2['default'])(options);
	  return Object.keys(lookup).map(function (key) {
	    return lookup[key].value;
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(8);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactTether = __webpack_require__(9);

	var _reactTether2 = _interopRequireDefault(_reactTether);

	var _EventsHandler = __webpack_require__(10);

	var _EventsHandler2 = _interopRequireDefault(_EventsHandler);

	var _childrenPropType = __webpack_require__(11);

	var _childrenPropType2 = _interopRequireDefault(_childrenPropType);

	var eventsHandler = new _EventsHandler2['default']();

	var Select = (function (_Component) {
	  _inherits(Select, _Component);

	  function Select() {
	    _classCallCheck(this, Select);

	    _get(Object.getPrototypeOf(Select.prototype), 'constructor', this).apply(this, arguments);

	    this.state = {
	      isOpen: false,
	      width: null
	    };
	  }

	  _createClass(Select, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var _this = this;

	      return {
	        onOptionSelect: function onOptionSelect(option) {
	          if (!_this.props.multiple) {
	            _this.setOpen(false);
	          }
	          _this.props.onChange(option);
	        },
	        isOpen: this.state.isOpen
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // set the tethered content width
	      this._setWidth();

	      // add component to events handler so we delegate everything to one handler
	      // rather than every component instance
	      eventsHandler.add(this);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.disabled !== nextProps.disabled && nextProps.disabled === true) {
	        this.setOpen(false);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      eventsHandler.remove(this);
	    }
	  }, {
	    key: 'setOpen',
	    value: function setOpen(isOpen) {
	      this.setState({ isOpen: isOpen });
	    }
	  }, {
	    key: '_setWidth',
	    value: function _setWidth() {
	      if (this.props.autoWidth) {
	        this.setState({ width: this._trigger.offsetWidth });
	      }
	    }
	  }, {
	    key: '_toggleOpen',
	    value: function _toggleOpen(_ref) {
	      var target = _ref.target;

	      if (this.props.disabled) return;

	      if (this._trigger.contains(target)) {
	        this.setOpen(!this.state.isOpen);
	      } else if (this._options && !this._options.contains(target)) {
	        this.setOpen(false);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props;
	      var offset = _props.offset;
	      var classPrefix = _props.classPrefix;
	      var autoWidth = _props.autoWidth;
	      var children = _props.children;
	      var renderOptions = _props.renderOptions;
	      var _state = this.state;
	      var isOpen = _state.isOpen;
	      var width = _state.width;

	      var childrenArray = _react.Children.toArray(children);
	      var firstChild = childrenArray[0];
	      var secondChild = childrenArray[1];

	      return _react2['default'].createElement(
	        _reactTether2['default'],
	        {
	          attachment: 'top left',
	          targetAttachment: 'bottom left',
	          offset: offset,
	          classPrefix: classPrefix,
	          constraints: [{
	            to: 'window',
	            attachment: 'together'
	          }],
	          style: {
	            width: width ? width + 'px' : ''
	          }
	        },
	        (0, _react.cloneElement)(firstChild, {
	          ref: function ref(c) {
	            _this2._trigger = (0, _reactDom.findDOMNode)(c);
	          }
	        }),
	        renderOptions(isOpen && (0, _react.cloneElement)(secondChild, {
	          ref: function ref(c) {
	            _this2._options = (0, _reactDom.findDOMNode)(c);
	          }
	        }))
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      name: _react.PropTypes.string,
	      multiple: _react.PropTypes.bool,
	      disabled: _react.PropTypes.bool,
	      offset: _react.PropTypes.string,
	      classPrefix: _react.PropTypes.string,
	      autoWidth: _react.PropTypes.bool,
	      renderOptions: _react.PropTypes.func,
	      onChange: _react.PropTypes.func,
	      children: _childrenPropType2['default']
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      name: 'S' + Math.abs(~ ~(Math.random() * new Date())),
	      multiple: false,
	      disabled: false,
	      offset: '0px 0px',
	      classPrefix: 'selectly',
	      autoWidth: true,
	      renderOptions: function renderOptions(options) {
	        return options;
	      },
	      onChange: function onChange() {
	        return null;
	      }
	    },
	    enumerable: true
	  }, {
	    key: 'childContextTypes',
	    value: {
	      onOptionSelect: _react.PropTypes.func,
	      isOpen: _react.PropTypes.bool
	    },
	    enumerable: true
	  }]);

	  return Select;
	})(_react.Component);

	exports['default'] = Select;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var EventsHandler = (function () {
	  function EventsHandler() {
	    var _this = this;

	    _classCallCheck(this, EventsHandler);

	    this._documentMouseDownHandler = function (e) {
	      for (var i = _this._queue.length; i--;) {
	        _this._queue[i]._toggleOpen(e);
	      }
	    };

	    this._resizeHandler = function () {
	      if (!_this._isTicking) {
	        requestAnimationFrame(_this._setWidth);
	      }
	      _this._isTicking = true;
	    };

	    this._setWidth = function () {
	      for (var i = _this._queue.length; i--;) {
	        _this._queue[i]._setWidth();
	      }
	      _this._isTicking = false;
	    };

	    this._queue = [];
	    this._isTicking = false;
	    this.create();
	  }

	  _createClass(EventsHandler, [{
	    key: 'create',
	    value: function create() {
	      document.addEventListener('mousedown', this._documentMouseDownHandler);
	      window.addEventListener('resize', this._resizeHandler);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._queue = [];
	      document.removeEventListener('mousedown', this._documentMouseDownHandler);
	      window.removeEventListener('resize', this._resizeHandler);
	    }
	  }, {
	    key: 'add',
	    value: function add(component) {
	      this._queue.push(component);
	    }
	  }, {
	    key: 'remove',
	    value: function remove(component) {
	      var pos = this._queue.indexOf(component);
	      if (pos > -1) {
	        this._queue.splice(pos, 1);
	      }
	    }
	  }]);

	  return EventsHandler;
	})();

	exports['default'] = EventsHandler;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = childrenPropType;

	var _react = __webpack_require__(7);

	function childrenPropType(_ref, propName, componentName) {
	  var children = _ref.children;

	  if (_react.Children.count(children) <= 1) {
	    return new Error(componentName + ' requires two children, the first child as the trigger and the second child as the set of options.');
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var Option = (function (_Component) {
	  _inherits(Option, _Component);

	  function Option() {
	    _classCallCheck(this, Option);

	    _get(Object.getPrototypeOf(Option.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Option, [{
	    key: '_handleMouseUp',
	    value: function _handleMouseUp() {
	      var _props = this.props;
	      var onMouseUp = _props.onMouseUp;
	      var value = _props.value;

	      this.context.onOptionSelect(value);

	      if (typeof onMouseUp === 'function') {
	        onMouseUp();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var _props2 = this.props;
	      var component = _props2.component;
	      var children = _props2.children;
	      var value = _props2.value;

	      var props = _objectWithoutProperties(_props2, ['component', 'children', 'value']);

	      return (0, _react.createElement)(component, _extends({}, props, {
	        onMouseUp: function onMouseUp() {
	          return _this._handleMouseUp();
	        }
	      }), children);
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      component: _react.PropTypes.string,
	      value: _react.PropTypes.any.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      component: 'li'
	    },
	    enumerable: true
	  }, {
	    key: 'contextTypes',
	    value: {
	      onOptionSelect: _react.PropTypes.func
	    },
	    enumerable: true
	  }]);

	  return Option;
	})(_react.Component);

	exports['default'] = Option;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;