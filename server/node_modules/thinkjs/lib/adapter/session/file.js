'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
 * file store
 * @type {Class}
 */
var FileStore = think.adapter('store', 'file');

/**
 * file session
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

    options = think.parseConfig(think.config('session'), options);

    this.timeout = options.timeout;
    this.cookie = options.cookie;
    this.newCookie = options.newCookie;
    this.path = options.path || _path2.default.normalize(_os2.default.tmpdir() + _path2.default.sep + 'thinkjs');
    this.path_depth = options.path_depth || 1;

    this.store = new FileStore({
      path: this.path
    });

    this.gcType = this.path;
    think.gc(this);

    this.data = null;
    this.dataEmpty = false;
  };
  /**
   * get stored file path
   * @return {String} []
   */


  _class.prototype.getFilepath = function getFilepath() {
    var name = this.cookie;
    var dir = name.slice(0, this.path_depth).split('').join(_path2.default.sep);
    return '' + dir + _path2.default.sep + name + '.json';
  };
  /**
   * get init data
   * @return {} []
   */


  _class.prototype.getInitData = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var filepath, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.newCookie) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', {});

            case 2:
              filepath = this.getFilepath();
              //ignore error

              _context.next = 5;
              return think.await('session_' + this.cookie, function () {
                return _this2.store.get(filepath).catch(function () {});
              });

            case 5:
              data = _context.sent;

              if (data) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', {});

            case 8:
              _context.prev = 8;

              data = JSON.parse(data);
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](8);
              return _context.abrupt('return', {});

            case 15:
              if (!(Date.now() > data.expire)) {
                _context.next = 20;
                break;
              }

              _context.next = 18;
              return this.store.delete(filepath);

            case 18:
              _context.next = 21;
              break;

            case 20:
              return _context.abrupt('return', data.data || {});

            case 21:
              return _context.abrupt('return', {});

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[8, 12]]);
    }));

    function getInitData() {
      return _ref.apply(this, arguments);
    }

    return getInitData;
  }();
  /**
   * get session data
   * @return {Promise} []
   */


  _class.prototype.getData = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.data) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', this.data);

            case 2:
              _context2.next = 4;
              return this.getInitData();

            case 4:
              data = _context2.sent;

              if (think.isEmpty(data)) {
                this.dataEmpty = true;
              }
              this.data = data;
              return _context2.abrupt('return', this.data);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getData() {
      return _ref2.apply(this, arguments);
    }

    return getData;
  }();
  /**
   * get data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.get = function get(name) {
    var _this3 = this;

    return this.getData().then(function () {
      return name ? _this3.data[name] : _this3.data;
    });
  };
  /**
   * set data
   * @param {String} name    []
   * @param {Mixed} value   []
   * @param {Number} timeout []
   */


  _class.prototype.set = function set(name, value) {
    var _this4 = this;

    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.timeout;

    this.timeout = timeout;
    return this.getData().then(function () {
      _this4.data[name] = value;
    });
  };
  /**
   * delete data
   * @param  {String} name []
   * @return {Promise}      []
   */


  _class.prototype.delete = function _delete(name) {
    var _this5 = this;

    return this.getData().then(function () {
      if (name) {
        delete _this5.data[name];
      } else {
        _this5.data = {};
      }
    });
  };
  /**
   * flush data to file
   * @return {Promise} []
   */


  _class.prototype.flush = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var data, saveData, filepath;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getData();

            case 2:
              data = _context3.sent;

              if (!(this.dataEmpty && think.isEmpty(data))) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt('return');

            case 5:
              saveData = {
                data: this.data,
                expire: Date.now() + this.timeout * 1000,
                timeout: this.timeout
              };
              filepath = this.getFilepath();
              return _context3.abrupt('return', this.store.set(filepath, (0, _stringify2.default)(saveData)));

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function flush() {
      return _ref3.apply(this, arguments);
    }

    return flush;
  }();
  /**
   * gc
   * @return {} []
   */


  _class.prototype.gc = function gc() {
    var _this6 = this;

    var now = Date.now();
    return this.store.list().then(function (files) {
      files.forEach(function (file) {
        var filepath = '' + _this6.path + _path2.default.sep + file;
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