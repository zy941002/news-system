'use strict';

/**
 * base store
 * @type {Class}
 */

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseStore = think.adapter('store', 'memory');

/**
 * memory session
 */

var _class = function (_think$adapter$base) {
  (0, _inherits3.default)(_class, _think$adapter$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$adapter$base.apply(this, arguments));
  }

  /**
   * init 
   * @param  {Object} config []
   * @return {}         []
   */
  _class.prototype.init = function init(options) {

    options = think.parseConfig(think.config('session'), options);

    this.timeout = options.timeout;
    //key is session cookie value
    this.cookie = options.cookie;
    //store
    this.store = new BaseStore({
      type: thinkCache.SESSION
    });
    //set gc type & start gc
    this.gcType = 'session_base';
    think.gc(this);
  };
  /**
   * get session data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.get = function get(name) {
    var _this2 = this;

    return this.store.get(this.cookie).then(function (data) {
      if (!data) {
        return;
      }
      if (Date.now() > data.expire) {
        return _this2.store.delete(_this2.cookie);
      }
      data.expire = Date.now() + _this2.timeout * 1000;
      var value = data.data;
      if (name) {
        return think.clone(value[name]);
      }
      return think.clone(value);
    });
  };
  /**
   * set session data
   * @param {String} name    []
   * @param {Mixed} value   []
   * @param {Number} timeout []
   * @return {Promise} []
   */


  _class.prototype.set = function set(name, value) {
    var _this3 = this;

    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.timeout;

    value = think.clone(value);
    return this.store.get(this.cookie).then(function (data) {
      var _data;

      data = data || {};
      data = think.extend({}, data, {
        expire: Date.now() + timeout * 1000,
        timeout: timeout,
        data: (_data = {}, _data[name] = value, _data)
      });
      return _this3.store.set(_this3.cookie, data);
    });
  };
  /**
   * delete session data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.delete = function _delete(name) {
    var _this4 = this;

    return this.store.get(this.cookie).then(function (data) {
      if (!data) {
        return;
      }
      if (!name) {
        return _this4.store.delete(_this4.cookie);
      }
      delete data.data[name];
    });
  };
  /**
   * gc
   * is internal method
   * @return {} []
   */


  _class.prototype.gc = function gc() {
    var now = Date.now();
    return this.store.list().then(function (list) {
      for (var key in list) {
        var item = list[key];
        if (item && now > item.expire) {
          delete list[key];
        }
      }
    });
  };

  return _class;
}(think.adapter.base);

exports.default = _class;