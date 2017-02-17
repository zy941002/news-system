'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * sqlite socket
 */
var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * init
   * @param  {Object} config []
   * @return {}        []
   */
  _class.prototype.init = function init() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _Base.prototype.init.call(this, config);

    if (config.path === true) {
      config.path = ':memory:';
    } else {
      config.path = config.path || think.RUNTIME_PATH + _path2.default.sep + 'sqlite';
      think.mkdir(config.path);
      config.path += '' + _path2.default.sep + config.database + '.sqlite';
    }
    this.config = config;
  };
  /**
   * get connection
   * @return {Promise} []
   */


  _class.prototype.getConnection = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var sqlite;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.connection) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', this.connection);

            case 2:
              _context.next = 4;
              return think.npm('sqlite3');

            case 4:
              sqlite = _context.sent;

              if (this.config.verbose) {
                sqlite = sqlite.verbose();
              }
              return _context.abrupt('return', think.await(this.config.path, function () {
                var deferred = think.defer();
                var db = new sqlite.Database(_this2.config.path, function (err) {
                  _this2.logConnect('sqlite://' + _this2.config.path, 'sqlite');

                  if (err) {
                    deferred.reject(err);
                  } else {
                    _this2.connection = db;
                    deferred.resolve(db);
                  }
                });
                //set timeout
                if (_this2.config.timeout) {
                  db.configure('busyTimeout', _this2.config.timeout * 1000);
                }
                var err = new Error('sqlite://' + _this2.config.path);
                return think.error(deferred.promise, err);
              }));

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getConnection() {
      return _ref.apply(this, arguments);
    }

    return getConnection;
  }();
  /**
   * query sql
   * @param  {String} sql []
   * @return {Promise}     []
   */


  _class.prototype.execute = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(sql) {
      var connection, deferred, startTime, logSql;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getConnection();

            case 2:
              connection = _context2.sent;
              deferred = think.defer();
              startTime = Date.now();
              logSql = this.config.log_sql;
              //can not use arrow functions in here

              connection.run(sql, function (err) {
                if (logSql) {
                  think.log(sql, 'SQL', startTime);
                }
                if (err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve({
                    insertId: this.lastID,
                    affectedRows: this.changes
                  });
                }
              });
              return _context2.abrupt('return', think.error(deferred.promise));

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function execute(_x2) {
      return _ref2.apply(this, arguments);
    }

    return execute;
  }();
  /**
   * execute sql
   * @param  {String} sql []
   * @return {Promise}     []
   */


  _class.prototype.query = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(sql) {
      var _this3 = this;

      var connection, startTime, fn, promise;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getConnection();

            case 2:
              connection = _context3.sent;
              startTime = Date.now();
              fn = think.promisify(connection.all, connection);
              promise = fn(sql).then(function (data) {
                if (_this3.config.log_sql) {
                  think.log(sql, 'SQL', startTime);
                }
                return data;
              }).catch(function (err) {
                if (_this3.config.log_sql) {
                  think.log(sql, 'SQL', startTime);
                }
                return _promise2.default.reject(err);
              });
              return _context3.abrupt('return', think.error(promise));

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function query(_x3) {
      return _ref3.apply(this, arguments);
    }

    return query;
  }();

  return _class;
}(_base2.default);

exports.default = _class;