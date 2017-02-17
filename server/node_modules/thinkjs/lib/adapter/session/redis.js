'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedisSocket = think.adapter('socket', 'redis');

/**
 * redis session
 */

var _class = function (_think$adapter$base) {
  (0, _inherits3.default)(_class, _think$adapter$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$adapter$base.apply(this, arguments));
  }

  /**
   * init
   * @param  {Object} options []
   * @return {}         []
   */
  _class.prototype.init = function init(options) {

    this.options = think.parseConfig(think.config('session'), options);

    this.timeout = this.options.timeout;
    this.cookie = this.options.cookie;
  };
  /**
   * get redis instance
   * @return {Object} []
   */


  _class.prototype.getRedisInstance = function getRedisInstance(name) {
    var options = think.parseConfig.call(this.options, think.config('redis'), {
      command: name,
      from: 'session'
    });
    this.timeout = options.timeout || this.timeout;
    return RedisSocket.getInstance(options, thinkCache.REDIS, ['command', 'from']);
  };
  /**
   * get session
   * @return {Promise} []
   */


  _class.prototype.getData = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var instance, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.data) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', this.data);

            case 2:
              instance = this.getRedisInstance('get');
              _context.next = 5;
              return think.await('session_' + this.cookie, function () {
                return instance.get(_this2.cookie);
              });

            case 5:
              data = _context.sent;

              if (!this.data) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', this.data);

            case 8:

              this.data = {};
              try {
                this.data = JSON.parse(data) || {};
              } catch (e) {}

              return _context.abrupt('return', this.data);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getData() {
      return _ref.apply(this, arguments);
    }

    return getData;
  }();
  /**
   * get data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.get = function get(name) {
    var _this3 = this;

    return this.getData().then(function () {
      return !name ? _this3.data : _this3.data[name];
    });
  };
  /**
   * set data
   * @param {String} name    []
   * @param {Mixed} value   []
   * @param {Number} timeout []
   */


  _class.prototype.set = function set(name, value, timeout) {
    var _this4 = this;

    if (timeout) {
      this.timeout = timeout;
    }
    return this.getData().then(function () {
      _this4.data[name] = value;
    });
  };
  /**
   * delete data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.delete = function _delete(name) {
    var _this5 = this;

    return this.getData().then(function () {
      if (name) {
        delete _this5.data[name];
      } else {
        _this5.data = {};
      }
    });
  };
  /**
   * flush data
   * @return {Promise} []
   */


  _class.prototype.flush = function flush() {
    var _this6 = this;

    return this.getData().then(function () {
      var instance = _this6.getRedisInstance('set');
      return instance.set(_this6.cookie, (0, _stringify2.default)(_this6.data), _this6.timeout);
    });
  };

  return _class;
}(think.adapter.base);

exports.default = _class;