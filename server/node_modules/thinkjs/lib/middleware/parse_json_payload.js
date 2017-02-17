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

    var types = http.config('post.json_content_type');
    if (types.indexOf(http.type()) === -1) {
      return;
    }
    return http.getPayload().then(function (payload) {
      var data = void 0;
      try {
        data = JSON.parse(payload);
      } catch (e) {
        //log error
        if (http.config('post.log_error')) {
          think.log(new Error('JSON.parse error, payload is not a valid JSON data'));
        }
        //if using json parse error, then use querystring parse.
        //sometimes http header has json content-type, but payload data is querystring data
        data = _querystring2.default.parse(payload);
      }
      if (!think.isEmpty(data)) {
        http._post = think.extend(http._post, data);
      }
      return null;
    });
  };

  return _class;
}(think.middleware.base);

exports.default = _class;