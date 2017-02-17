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

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * parse single file payload, uploaded with ajax
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

    var post = this.config('post');
    var filename = http.header(post.single_file_header);
    if (!filename) {
      return;
    }

    var uploadDir = post.file_upload_path;
    if (!uploadDir) {
      uploadDir = _os2.default.tmpdir() + think.sep + 'thinkjs' + think.sep + 'upload';
    }
    think.mkdir(uploadDir);

    return this.getUploadFile(uploadDir, filename);
  };
  /**
   * get upload file
   * @param  {String} uploadDir []
   * @param  {String} filename  []
   * @return {Promise}           []
   */


  _class.prototype.getUploadFile = function getUploadFile(uploadDir, filename) {
    var deferred = think.defer();
    var http = this.http;
    var name = think.uuid(20);
    var filepath = uploadDir + think.sep + name + _path2.default.extname(filename).slice(0, 5);
    var stream = _fs2.default.createWriteStream(filepath);
    http.req.pipe(stream);
    stream.on('error', function (err) {
      http.res.statusCode = 400;
      http.end();
      //log error
      if (http.config('post.log_error')) {
        think.log(err);
      }
    });
    stream.on('close', function () {
      http._file.file = {
        fieldName: 'file',
        originalFilename: filename,
        path: filepath,
        size: _fs2.default.statSync(filepath).size
      };
      deferred.resolve(null);
    });
    return deferred.promise;
  };

  return _class;
}(think.middleware.base);

exports.default = _class;