'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$adapter$base) {
  (0, _inherits3.default)(_class, _think$adapter$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$adapter$base.apply(this, arguments));
  }

  /**
   * init
   * @param  {Object} server []
   * @param  {Object} config []
   * @return {Object}        []
   */
  _class.prototype.init = function init(server, config, app) {
    this.server = server;
    this.config = config;
    this.app = app;
  };
  /**
   * check origin allowed
   * @param  {String}  origin []
   * @return {Boolean}        []
   */


  _class.prototype.isOriginAllowed = function isOriginAllowed(origin) {
    var allowOrigins = this.config.allow_origin;
    if (!allowOrigins) {
      return true;
    }
    var info = _url2.default.parse(origin);
    var hostname = info.hostname;
    if (think.isString(allowOrigins)) {
      return allowOrigins === hostname;
    } else if (think.isArray(allowOrigins)) {
      return allowOrigins.indexOf(hostname) > -1;
    } else if (think.isFunction(allowOrigins)) {
      return allowOrigins(hostname, info);
    }
    return false;
  };
  /**
   * run
   * @return {} []
   */


  _class.prototype.run = function run() {};

  return _class;
}(think.adapter.base);

exports.default = _class;