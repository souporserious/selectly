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