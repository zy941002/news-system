'use strict';

/**
 * socket base class
 */

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$adapter$base) {
  (0, _inherits3.default)(_class, _think$adapter$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$adapter$base.apply(this, arguments));
  }

  /**
   * init
   * @return {} []
   */
  _class.prototype.init = function init() {
    this.connection = null;
    //query queue nums
    this.queueNums = 0;
    //auto close socket timer
    this.closeTimer = 0;
  };
  /**
   * log connection
   * @return {} []
   */


  _class.prototype.logConnect = function logConnect(str, type) {
    //log mongodb connection infomation
    if (this.config.log_connect) {
      think.log(function (colors) {
        return 'Connect ' + type + ' with ' + colors.magenta(str);
      }, 'SOCKET');
    }
  };
  /**
   * auto close socket on cli mode
   * @return {Promise} []
   */


  _class.prototype.autoClose = function autoClose(promise) {
    var _this2 = this;

    if (!think.config('auto_close_socket')) {
      return promise;
    }

    var close = function close() {
      _this2.queueNums--;
      if (_this2.queueNums === 0) {
        _this2.closeTimer = setTimeout(function () {
          _this2.close();
        }, 3000);
      }
    };

    clearTimeout(this.closeTimer);

    this.queueNums++;
    return promise.then(function (data) {
      close();
      return data;
    }).catch(function (err) {
      close();
      return _promise2.default.reject(err);
    });
  };
  /**
   * close socket connection
   * @return {} []
   */


  _class.prototype.close = function close() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  };

  /**
   * get instance
   * @param  {Object} config []
   * @return {Object}        []
   */


  _class.getInstance = function getInstance(config, type) {
    var extraKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    config = think.parseConfig(config);

    //delete extra keys when caculate config md5 value
    extraKeys.forEach(function (item) {
      return delete config[item];
    });
    var key = think.md5((0, _stringify2.default)(config)).slice(0, 5);

    var instance = thinkCache(type, key);
    if (!instance) {
      instance = new this(config);
      thinkCache(type, key, instance);
    }
    return instance;
  };

  return _class;
}(think.adapter.base);

exports.default = _class;