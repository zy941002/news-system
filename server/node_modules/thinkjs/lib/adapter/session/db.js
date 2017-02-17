'use strict';
/**
 * db session
 
  DROP TABLE IF EXISTS `think_session`;
  CREATE TABLE `think_session` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `cookie` varchar(255) NOT NULL DEFAULT '',
    `data` text,
    `expire` bigint(11) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `cookie` (`cookie`),
    KEY `expire` (`expire`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 */

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.cookie = options.cookie;
    this.newCookie = options.newCookie;

    this.timeout = options.timeout;
    this.isChanged = false;

    //let dbConfig = think.extend({}, think.config('db'), options);
    this.model = think.model('session', think.extend({
      from: 'session'
    }, think.config('db')));

    this.gcType = 'session_db';
    think.gc(this);
  };
  /**
   * get session data
   * @return {Promise} []
   */


  _class.prototype.getData = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.data) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', this.data);

            case 2:
              if (!this.newCookie) {
                _context.next = 7;
                break;
              }

              this.data = {};
              _context.next = 6;
              return this.model.add({ cookie: this.cookie, expire: Date.now() + this.timeout * 1000 });

            case 6:
              return _context.abrupt('return', this.data);

            case 7:
              _context.next = 9;
              return think.await('session_' + this.cookie, function () {
                return _this2.model.where({ cookie: _this2.cookie }).find();
              });

            case 9:
              data = _context.sent;

              if (!this.data) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', this.data);

            case 12:

              this.data = {};

              if (!think.isEmpty(data)) {
                _context.next = 17;
                break;
              }

              _context.next = 16;
              return this.model.add({ cookie: this.cookie, expire: Date.now() + this.timeout * 1000 });

            case 16:
              return _context.abrupt('return', this.data);

            case 17:
              if (!(Date.now() > data.expire)) {
                _context.next = 19;
                break;
              }

              return _context.abrupt('return', this.data);

            case 19:

              try {
                this.data = JSON.parse(data.data) || {};
              } catch (e) {}

              return _context.abrupt('return', this.data);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getData() {
      return _ref.apply(this, arguments);
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
      _this4.isChanged = true;
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
      _this5.isChanged = true;
      if (name) {
        delete _this5.data[name];
      } else {
        _this5.data = {};
      }
    });
  };
  /**
   * flush data
   * @return {Promise} []
   */


  _class.prototype.flush = function flush() {
    var _this6 = this;

    var data = {
      expire: Date.now() + this.timeout * 1000,
      timeout: this.timeout
    };
    return this.getData().then(function () {
      //if session is empty and not changed, not flush
      if (!_this6.isChanged && think.isEmpty(_this6.data)) {
        return;
      }
      //update data when data is changed
      if (_this6.isChanged) {
        data.data = (0, _stringify2.default)(_this6.data);
      }
      return _this6.model.where({ cookie: _this6.cookie }).update(data);
    });
  };
  /**
   * gc
   * @return {Promise} []
   */


  _class.prototype.gc = function gc() {
    return this.model.where({ expire: { '<': Date.now() } }).delete();
  };

  return _class;
}(think.adapter.base);

exports.default = _class;