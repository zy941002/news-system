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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * file store
 * @type {Class}
 */
var FileStore = think.adapter('store', 'file');

/**
 * file cache
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
    this.file_ext = options.file_ext;
    this.path = options.path;
    this.path_depth = options.path_depth || 1;

    this.store = new FileStore({
      path: this.path
    });

    this.gcType = this.path;
    think.gc(this);
  };
  /**
   * get stored file path
   * @return {String} []
   */


  _class.prototype.getFilepath = function getFilepath(name) {
    name = think.md5(name);
    var dir = name.slice(0, this.path_depth).split('').join(_path2.default.sep);
    return '' + dir + _path2.default.sep + name + this.file_ext;
  };
  /**
   * get data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.get = function get(name) {
    var _this2 = this;

    var filepath = this.getFilepath(name);
    return this.store.get(filepath).then(function (data) {
      if (!data) {
        return;
      }
      try {
        data = JSON.parse(data);
        if (data.expire && Date.now() > data.expire) {
          return _this2.store.delete(filepath);
        } else {
          return data.data;
        }
      } catch (e) {
        return _this2.store.delete(filepath);
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
    var filepath = this.getFilepath(name);
    var data = {
      data: value,
      expire: Date.now() + timeout * 1000,
      timeout: timeout
    };
    return this.store.set(filepath, (0, _stringify2.default)(data)).catch(function () {});
  };
  /**
   * delete data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.delete = function _delete(name) {
    var filepath = this.getFilepath(name);
    return this.store.delete(filepath).catch(function () {});
  };
  /**
   * gc
   * @return {} []
   */


  _class.prototype.gc = function gc() {
    var _this3 = this;

    var now = Date.now();
    return this.store.list().then(function (files) {
      files.forEach(function (file) {
        var filepath = '' + _this3.path + _path2.default.sep + file;
        var content = _fs2.default.readFileSync(filepath, 'utf8');
        try {
          var data = JSON.parse(content);
          if (now > data.expire) {
            _fs2.default.unlink(filepath, function () {});
          }
        } catch (e) {
          _fs2.default.unlink(filepath, function () {});
        }
      });
    });
  };

  return _class;
}(think.adapter.base);

exports.default = _class;