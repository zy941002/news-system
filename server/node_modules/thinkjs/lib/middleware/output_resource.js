'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * output resource
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
  _class.prototype.run = function run(file) {
    //not resource
    if (file === false) {
      return;
    }
    var http = this.http;
    //is resource but not exist
    if (file === true) {
      http.status(404);
      http.end();
      return think.prevent();
    }
    //flag request is resource
    http._isResource = true;

    var contentType = _mime2.default.lookup(file);
    http.type(contentType, false);

    var range = http.header('range');
    if (!range) {
      return this.outputNormal(file);
    }
    return this.outputRange(file, range);
  };
  /**
   * output normal file
   * @param  {String} file []
   * @return {Promise}      []
   */


  _class.prototype.outputNormal = function outputNormal(file) {
    var http = this.http;
    var stream = _fs2.default.createReadStream(file);
    stream.pipe(http.res);
    stream.on('end', function () {
      http.end();
    });
    stream.on('error', function () {
      http.end();
    });
    return think.prevent();
  };
  /**
   * output range file
   * @param  {String} file  []
   * @param  {String} range []
   * @return {Promise}       []
   */


  _class.prototype.outputRange = function outputRange(file, range) {
    //request has range header
    var size = _fs2.default.statSync(file).size;
    var match = range.match(/bytes=(\d+)\-(\d*)/);
    var slice = 1 * 1024 * 1024;
    var from = parseInt(match[1]) || 0;
    var to = parseInt(match[2]) || 0;
    if (!to) {
      to = from + slice - 1;
    }
    to = Math.min(to, size - 1);

    var http = this.http;
    http.status(206);
    http.header('Accept-Ranges', 'bytes');
    http.header('Content-Range', 'bytes ' + from + '-' + to + '/' + size);

    var fd = _fs2.default.openSync(file, 'r');
    var buffer = new Buffer(to - from + 1);
    _fs2.default.readSync(fd, buffer, 0, to - from, from);
    _fs2.default.closeSync(fd);
    http.end(buffer);

    return think.prevent();
  };

  return _class;
}(think.middleware.base);

exports.default = _class;