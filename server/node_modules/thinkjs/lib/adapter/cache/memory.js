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
 * memory cache
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

    options = think.parseConfig(think.config('cache'), options);

    this.timeout = options.timeout;

    this.store = new BaseStore({
      type: thinkCache.MEMORY
    });

    //set gc type & start gc
    this.gcType = 'cache_memory';
    think.gc(this);
  };
  /**
   * get session data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.get = function get(name) {
    var _this2 = this;

    return this.store.get(name).then(function (data) {
      if (!data) {
        return;
      }
      //data is expire
      if (data.expire && Date.now() > data.expire) {
        return _this2.store.delete(name);
      }
      return think.clone(data.data);
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
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.timeout;

    value = think.clone(value);
    var data = {
      expire: timeout > 0 ? Date.now() + timeout * 1000 : null,
      timeout: timeout,
      data: value
    };
    return this.store.set(name, data);
  };
  /**
   * delete session data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.delete = function _delete(name) {
    return this.store.delete(name);
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
        if (item && item.expire && now > item.expire) {
          delete list[key];
        }
      }
    });
  };

  return _class;
}(think.adapter.base);

exports.default = _class;