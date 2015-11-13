(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("TetherElement"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "TetherElement"], factory);
	else if(typeof exports === 'object')
		exports["Selectly"] = factory(require("React"), require("TetherElement"));
	else
		root["Selectly"] = factory(root["React"], root["TetherElement"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Selectly = __webpack_require__(1);

	var _Selectly2 = _interopRequireDefault(_Selectly);

	exports['default'] = _Selectly2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsShallowCompare = __webpack_require__(3);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _reactTether = __webpack_require__(6);

	var _reactTether2 = _interopRequireDefault(_reactTether);

	var _EventsHandler = __webpack_require__(7);

	var _EventsHandler2 = _interopRequireDefault(_EventsHandler);

	var eventsHandler = new _EventsHandler2['default']();
	var defaultTrigger = function defaultTrigger(currentOptions, isActive, isDisabled) {
	  var isMultiple = currentOptions.constructor === Array;

	  if (!isMultiple) {
	    currentOptions = [currentOptions];
	  }

	  return _react2['default'].createElement(
	    'button',
	    {
	      type: 'button',
	      className: 'react-select__trigger' + (isMultiple ? ' react-select__trigger--multiple' : '') + (isActive ? ' react-select__trigger--active' : '') + (isDisabled ? ' react-select__trigger--disabled' : '')
	    },
	    currentOptions.map(function (currentOption) {
	      return _react2['default'].createElement(
	        'span',
	        {
	          key: currentOption.label,
	          className: 'react-select__trigger__option'
	        },
	        currentOption.label
	      );
	    }),
	    _react2['default'].createElement(
	      'svg',
	      {
	        width: '21px',
	        height: '21px',
	        viewBox: '0 0 21 21',
	        className: 'react-select__trigger__arrow'
	      },
	      _react2['default'].createElement('polygon', { points: '10.5,12 7,8.5 14,8.5' })
	    )
	  );
	};
	var defaultContent = function defaultContent(content, isOpen) {
	  return isOpen ? content : _react2['default'].createElement('span', null);
	};
	var defaultOption = function defaultOption(_ref, nestedOptions, level) {
	  var value = _ref.value;
	  var label = _ref.label;
	  var onSelect = _ref.onSelect;

	  return _react2['default'].createElement(
	    'li',
	    {
	      key: value || label,
	      className: nestedOptions ? 'react-select__optgroup' : 'react-select__option',
	      onClick: !nestedOptions && onSelect
	    },
	    !nestedOptions ? _react2['default'].createElement(
	      'div',
	      {
	        title: typeof label === 'string' && label || '',
	        className: 'react-select__option__label'
	      },
	      label
	    ) : _react2['default'].createElement(
	      'strong',
	      {
	        title: label,
	        className: 'react-select__optgroup__title'
	      },
	      label
	    ),
	    ' ',
	    nestedOptions && _react2['default'].createElement(
	      'ul',
	      { className: 'react-select__options react-select__options--' + level },
	      nestedOptions
	    )
	  );
	};
	var noopFunc = function noopFunc() {
	  return null;
	};

	var Selectly = (function (_Component) {
	  _inherits(Selectly, _Component);

	  function Selectly() {
	    var _this = this;

	    _classCallCheck(this, Selectly);

	    _get(Object.getPrototypeOf(Selectly.prototype), 'constructor', this).apply(this, arguments);

	    this.state = {
	      isOpen: false,
	      width: 0
	    };
	    this._id = 'S' + Math.abs(~ ~(Math.random() * new Date()));
	    this._firstOption = null;
	    this._lookup = this._buildLookup(this.props.options);

	    this._handleOptionClick = function (option) {
	      _this.props.onChange(option);

	      if (!_this.props.multiple) {
	        _this._setOpen(false);

	        // for some reason tether won't get disabled on an option click,
	        // this works for now, but need to look into fixing it
	        setTimeout(function () {
	          _this.refs.tether.disable();
	        }, 0);
	      } else {}
	    };
	  }

	  _createClass(Selectly, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
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
	      this._lookup = this._buildLookup(nextProps.options);

	      if (this.props.disabled !== nextProps.disabled && nextProps.disabled === true) {
	        this._setOpen(false);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      eventsHandler.remove(this);
	    }
	  }, {
	    key: '_setOpen',
	    value: function _setOpen(isOpen) {
	      this.setState({ isOpen: isOpen });

	      // enable / disable tethered content
	      if (isOpen) {
	        this.refs.tether.enable();
	      } else {
	        this.refs.tether.disable();
	      }
	    }
	  }, {
	    key: '_setWidth',
	    value: function _setWidth() {
	      if (this.props.autoWidth) {
	        this.setState({ width: this.refs.trigger.offsetWidth });
	      }
	    }
	  }, {
	    key: '_toggleOpen',
	    value: function _toggleOpen(e) {
	      if (this.props.disabled) return;

	      if (this.refs.trigger.contains(e.target)) {
	        this._setOpen(!this.state.isOpen);
	      } else if (this.refs.drop && !this.refs.drop.contains(e.target)) {
	        this._setOpen(false);
	      }
	    }
	  }, {
	    key: '_buildLookup',
	    value: function _buildLookup(options) {
	      var _lookup = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var len = options.length;

	      for (var i = 0; i < len; i++) {
	        var option = options[i];
	        var optgroup = option.optgroup;
	        var value = option.value;
	        var label = option.label;

	        if (optgroup) {
	          this._buildLookup(optgroup, _lookup);
	        } else {
	          var _option = options[i];

	          // store in lookup so we can retrieve the selected option
	          _lookup[value] = _option;

	          // if the first option store it so we can access it
	          // for the current value, this way we don't have to
	          // worry about transforming the object into an array
	          if (!this._firstOption) {
	            this._firstOption = _option;
	          }
	        }
	      }
	      return _lookup;
	    }
	  }, {
	    key: '_getCurrentOption',
	    value: function _getCurrentOption() {
	      var _this2 = this;

	      var value = this.props.value;

	      var option = null;

	      // if no value provided return the first option
	      if (!value) {
	        option = this._firstOption;
	        // if an array we return an array of the selected options back
	      } else if (value.constructor === Array) {
	          option = value.map(function (currValue) {
	            return _this2._lookup[currValue];
	          });
	          // otherwise just return the single selected option
	        } else {
	            option = this._lookup[value];
	          }

	      return option;
	    }
	  }, {
	    key: '_renderTrigger',
	    value: function _renderTrigger(currentOption, isActive, isDisabled) {
	      return this.props.renderTrigger(currentOption, isActive, isDisabled);
	    }
	  }, {
	    key: '_renderHeader',
	    value: function _renderHeader() {
	      var _this3 = this;

	      var closeMenu = function closeMenu() {
	        return _this3._setOpen(false);
	      };
	      return this.props.renderHeader(closeMenu);
	    }
	  }, {
	    key: '_renderOption',
	    value: function _renderOption(option) {
	      var _this4 = this;

	      var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	      var value = option.value;
	      var label = option.label;
	      var optgroup = option.optgroup;

	      var nestedOptions = null;

	      // check if nested options passed in
	      if (optgroup) {
	        level++;
	        nestedOptions = optgroup.map(function (nestedOption) {
	          return _this4._renderOption(nestedOption, level);
	        });
	      }

	      return this.props.renderOption(_extends({}, option, { onSelect: this._handleOptionClick.bind(null, option) }), nestedOptions, level);
	    }
	  }, {
	    key: '_renderFooter',
	    value: function _renderFooter() {
	      var _this5 = this;

	      var closeMenu = function closeMenu() {
	        return _this5._setOpen(false);
	      };
	      return this.props.renderFooter(closeMenu);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this6 = this;

	      var _props = this.props;
	      var modifier = _props.modifier;
	      var options = _props.options;
	      var disabled = _props.disabled;
	      var offset = _props.offset;
	      var wrapper = _props.wrapper;
	      var autoWidth = _props.autoWidth;
	      var _state = this.state;
	      var isOpen = _state.isOpen;
	      var width = _state.width;

	      var currentOption = this._getCurrentOption();
	      var triggerClassName = 'react-select';
	      var dropClassName = 'react-select-drop';
	      var triggerStyle = {};
	      var dropStyle = {};

	      if (modifier) {
	        triggerClassName += ' ' + triggerClassName + '--' + name;
	        dropClassName += ' ' + dropClassName + '--' + name;
	      }

	      if (autoWidth) {
	        dropStyle = { width: width };
	      }

	      return _react2['default'].createElement(
	        'div',
	        { ref: 'trigger', className: triggerClassName },
	        this._renderTrigger(currentOption, isOpen, disabled),
	        _react2['default'].createElement(
	          _reactTether2['default'],
	          {
	            ref: 'tether',
	            target: this.refs.trigger,
	            options: {
	              attachment: 'top left',
	              targetAttachment: 'bottom left',
	              offset: offset,
	              classPrefix: 'react-select',
	              constraints: [{
	                to: 'window',
	                attachment: 'together'
	              }]
	            }
	          },
	          this.props.renderContent(_react2['default'].createElement(
	            'div',
	            {
	              ref: 'drop',
	              className: dropClassName,
	              style: dropStyle
	            },
	            this._renderHeader(),
	            _react2['default'].createElement(
	              'ul',
	              { className: 'react-select__options' },
	              options.map(function (option) {
	                return _this6._renderOption(option);
	              })
	            ),
	            this._renderFooter()
	          ), isOpen)
	        )
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      name: _react.PropTypes.string,
	      value: _react.PropTypes.any,
	      options: _react.PropTypes.array,
	      multiple: _react.PropTypes.bool,
	      disabled: _react.PropTypes.bool,
	      offset: _react.PropTypes.string,
	      autoWidth: _react.PropTypes.bool,
	      renderTrigger: _react.PropTypes.func,
	      renderContent: _react.PropTypes.func,
	      renderOption: _react.PropTypes.func,
	      renderHeader: _react.PropTypes.func,
	      renderFooter: _react.PropTypes.func,
	      onChange: _react.PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      //name: this._id, // use uuid if no name for aria labels
	      value: null,
	      options: [],
	      multiple: false,
	      disabled: false,
	      offset: '0px 0px',
	      autoWidth: true,
	      renderTrigger: defaultTrigger,
	      renderContent: defaultContent,
	      renderOption: defaultOption,
	      renderHeader: noopFunc,
	      renderFooter: noopFunc,
	      onChange: noopFunc
	    },
	    enumerable: true
	  }]);

	  return Selectly;
	})(_react.Component);

	exports['default'] = Selectly;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule shallowCompare
	*/

	'use strict';

	var shallowEqual = __webpack_require__(5);

	/**
	 * Does a shallow comparison for props and state.
	 * See ReactComponentWithPureRenderMixin
	 */
	function shallowCompare(instance, nextProps, nextState) {
	  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
	}

	module.exports = shallowCompare;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * 
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
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

	    this._documentClickHandler = function (e) {
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
	      document.addEventListener('click', this._documentClickHandler);
	      window.addEventListener('resize', this._resizeHandler);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._queue = [];
	      document.removeEventListener('click', this._documentClickHandler);
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

/***/ }
/******/ ])
});
;