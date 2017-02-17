'use strict';
/**
 * store base class
 */

exports.__esModule = true;

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
  _class.prototype.init = function init(config) {
    this.config = think.extend({
      type: thinkCache.MEMORY
    }, config);

    this.data = thinkCache(this.config.type);
  };
  /**
   * get content
   * @param  {String} key []
   * @return {Promise}     []
   */


  _class.prototype.get = function get(key) {
    return _promise2.default.resolve(this.data[key]);
  };
  /**
   * set key content
   * @param {} key     []
   * @param {} content []
   */


  _class.prototype.set = function set(key, content) {
    this.data[key] = content;
    return _promise2.default.resolve();
  };
  /**
   * delete key
   * @param  {String} key []
   * @return {}     []
   */


  _class.prototype.delete = function _delete(key) {
    delete this.data[key];
    return _promise2.default.resolve();
  };
  /**
   * get all data
   * @return {} []
   */


  _class.prototype.list = function list() {
    return _promise2.default.resolve(this.data);
  };

  return _class;
}(think.adapter.base);

exports.default = _class;