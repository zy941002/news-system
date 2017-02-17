'use strict';

/**
 * validate post data
 * @type {}
 */

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
    var http = this.http;
    var post = http._post;
    var length = (0, _keys2.default)(post).length;
    if (length > think.config('post.max_fields')) {
      http.res.statusCode = 400;
      http.end();
      return think.prevent();
    }
    var maxFilesSize = think.config('post.max_fields_size');
    for (var name in post) {
      if (post[name] && post[name].length > maxFilesSize) {
        http.res.statusCode = 400;
        http.end();
        return think.prevent();
      }
    }
  };

  return _class;
}(think.middleware.base);

exports.default = _class;