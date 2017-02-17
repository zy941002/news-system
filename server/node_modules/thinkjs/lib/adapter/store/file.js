'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
 * file store class
 */
var _class = function (_think$adapter$base) {
  (0, _inherits3.default)(_class, _think$adapter$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$adapter$base.apply(this, arguments));
  }

  /**
   * init
   * @param  {Object} config []
   * @return {}        []
   */
  _class.prototype.init = function init(config) {
    this.config = think.extend({
      path: ''
    }, config);

    if (!this.config.path) {
      throw new Error('config.path must be set');
    }

    if (!think.isDir(this.config.path)) {
      think.mkdir(this.config.path);
    }
  };
  /**
   * get file path
   * @param  {String} key []
   * @return {String}     []
   */


  _class.prototype.getFilePath = function getFilePath(key) {
    return this.config.path + _path2.default.sep + key;
  };
  /**
   * get data
   * @param  {String} key []
   * @return {Promise}    []
   */


  _class.prototype.get = function get(key) {
    var _this2 = this;

    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var filePath = this.getFilePath(key);
    if (times === 1 && !think.isFile(filePath)) {
      return _promise2.default.resolve();
    }
    // try 3 times when can not get file content
    return think.promisify(_fs2.default.readFile, _fs2.default)(filePath, { encoding: 'utf8' }).then(function (content) {
      if (!content && times <= 3) {
        return _this2.get(key, times + 1);
      }
      return content;
    });
  };
  /**
   * set file content
   * @param {String} key     []
   * @param {String} content []
   */


  _class.prototype.set = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(key, content) {
      var filePath, fn;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              filePath = this.getFilePath(key);

              think.mkdir(_path2.default.dirname(filePath));
              fn = think.promisify(_fs2.default.writeFile, _fs2.default);
              return _context.abrupt('return', fn(filePath, content).then(function () {
                think.chmod(filePath);
              }));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function set(_x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return set;
  }();
  /**
   * delete file
   * @param  {String} key []
   * @return {Promise}     []
   */


  _class.prototype.delete = function _delete(key) {
    var filepath = this.getFilePath(key);
    if (!think.isFile(filepath)) {
      return _promise2.default.resolve();
    }
    return think.promisify(_fs2.default.unlink, _fs2.default)(filepath);
  };
  /**
   * get all files
   * @return {Promise} []
   */


  _class.prototype.list = function list() {
    return _promise2.default.resolve(think.getFiles(this.config.path));
  };

  return _class;
}(think.adapter.base);

exports.default = _class;