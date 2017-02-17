'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * parse json payload
 * @type {}
 */
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
    var http = this.http;

    if (!http.req.readable) {
      return;
    }

    var contentType = http.type();
    if (contentType && contentType.indexOf('application/x-www-form-urlencoded') === -1) {
      return;
    }

    return http.getPayload().then(function (payload) {
      http._post = think.extend(http._post, _querystring2.default.parse(payload));
      return null;
    });
  };

  return _class;
}(think.middleware.base);

exports.default = _class;