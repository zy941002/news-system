'use strict';
/**
 * subdomain
 * @type {}
 */

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$middleware$bas) {
  (0, _inherits3.default)(_class, _think$middleware$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$middleware$bas.apply(this, arguments));
  }

  /**
   * run
   * @return {} []
   */
  _class.prototype.run = function run() {
    var subdomain = this.config('subdomain');
    if (think.isEmpty(subdomain)) {
      return;
    }
    var http = this.http;
    var hostname = http.hostname.split('.')[0];
    var value = subdomain[hostname];
    if (!value) {
      return;
    }
    http.pathname = value + '/' + http.pathname;
  };

  return _class;
}(think.middleware.base);

exports.default = _class;