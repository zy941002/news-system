'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _multiparty = require('multiparty');

var _multiparty2 = _interopRequireDefault(_multiparty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MULTIPARTY_REG = /^multipart\/(form-data|related);\s*boundary=(?:"([^"]+)"|([^;]+))$/i;

/**
 * parse form payload
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

    //file upload by form or FormData
    //can not use http.type method
    if (!MULTIPARTY_REG.test(http.headers['content-type'])) {
      return;
    }

    //make upload file path
    var uploadDir = think.config('post.file_upload_path');
    if (!uploadDir) {
      uploadDir = _os2.default.tmpdir() + think.sep + 'thinkjs' + think.sep + 'upload';
    }
    think.mkdir(uploadDir);

    return this.getFormData(uploadDir);
  };
  /**
   * get form data
   * @return {Promise} []
   */


  _class.prototype.getFormData = function getFormData(uploadDir) {
    var http = this.http;
    var deferred = think.defer();
    var postConfig = think.config('post');
    var form = new _multiparty2.default.Form({
      maxFieldsSize: postConfig.max_fields_size,
      maxFields: postConfig.max_fields,
      maxFilesSize: postConfig.max_file_size,
      uploadDir: uploadDir
    });
    //support for file with multiple="multiple"
    var files = http._file;
    form.on('file', function (name, value) {
      if (name in files) {
        if (!think.isArray(files[name])) {
          files[name] = [files[name]];
        }
        files[name].push(value);
      } else {
        files[name] = value;
      }
    });
    form.on('field', function (name, value) {
      http._post[name] = value;
    });
    form.on('close', function () {
      deferred.resolve(null);
    });
    form.on('error', function (err) {
      http.req.resume();
      http.res.statusCode = 400;
      http.end();
      //log error
      if (http.config('post.log_error')) {
        think.log(err);
      }
    });
    form.parse(http.req);
    return deferred.promise;
  };

  return _class;
}(think.middleware.base);

exports.default = _class;