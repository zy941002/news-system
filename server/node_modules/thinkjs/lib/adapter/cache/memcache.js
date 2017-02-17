'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MemcacheSocket = think.adapter('socket', 'memcache');

/**
 * memcache cache
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
    this.options = think.parseConfig(think.config('cache'), options);
    this.timeout = this.options.timeout || 0;
    this.prefix = this.options.prefix || '';
  };
  /**
   * get memcache instance
   * @param  {String} command []
   * @return {}         []
   */


  _class.prototype.getMemcacheInstance = function getMemcacheInstance(name) {
    var options = think.parseConfig.call(this.options, think.config('memcache'), {
      command: name,
      from: 'cache'
    });
    this.timeout = options.timeout || this.timeout;
    this.prefix = options.prefix || this.prefix;
    return MemcacheSocket.getInstance(options, thinkCache.MEMCACHE, ['command', 'from']);
  };
  /**
   * get data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.get = function get(name) {
    var instance = this.getMemcacheInstance('get');
    return instance.get(this.prefix + name).then(function (value) {
      if (value) {
        return JSON.parse(value);
      }
    }).catch(function () {});
  };
  /**
   * set data
   * @param {String} name    []
   * @param {Mixed} value   []
   * @param {Number} timeout []
   */


  _class.prototype.set = function set(name, value) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.timeout;

    if (think.isObject(name)) {
      timeout = value || timeout;
      var key = (0, _keys2.default)(name)[0];
      value = name[key];
      name = key;
    }
    var instance = this.getMemcacheInstance('set');
    var data = (0, _stringify2.default)(value);
    return instance.set(this.prefix + name, data, timeout).catch(function () {});
  };
  /**
   * delete data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.delete = function _delete(name) {
    var instance = this.getMemcacheInstance('delete');
    return instance.delete(this.prefix + name).catch(function () {});
  };

  return _class;
}(think.adapter.base);

exports.default = _class;