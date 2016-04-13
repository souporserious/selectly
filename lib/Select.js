'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTether = require('react-tether');

var _reactTether2 = _interopRequireDefault(_reactTether);

var _EventsHandler = require('./Events-Handler');

var _EventsHandler2 = _interopRequireDefault(_EventsHandler);

var _childrenPropType = require('./children-prop-type');

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
          }]
        },
        (0, _react.cloneElement)(firstChild, {
          ref: function ref(c) {
            _this2._trigger = (0, _reactDom.findDOMNode)(c);
          }
        }),
        renderOptions(isOpen && (0, _react.cloneElement)(secondChild, {
          ref: function ref(c) {
            _this2._options = (0, _reactDom.findDOMNode)(c);
          },
          style: _extends({
            width: width || ''
          }, secondChild.props.style)
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