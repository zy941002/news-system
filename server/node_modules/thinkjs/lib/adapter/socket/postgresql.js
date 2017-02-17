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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * postgres socket class
 * @return {} []
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
  _class.prototype.init = function init(config) {
    _Base.prototype.init.call(this, config);

    config.port = config.port || 5432;
    //config.password = config.pwd;
    //delete config.pwd;

    this.config = config;
  };
  /**
   * get pg
   * @return {} []
   */


  _class.prototype.getPG = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var pg;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.pg) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', this.pg);

            case 2:
              _context.next = 4;
              return think.npm('pg');

            case 4:
              pg = _context.sent;

              //set poolSize
              if (this.config.poolSize) {
                pg.defaults.poolSize = this.config.poolSize;
              }
              //set poolIdleTimeout, change default `30 seconds` to 8 hours
              pg.defaults.poolIdleTimeout = this.config.poolIdleTimeout * 1000 || 8 * 60 * 60 * 1000;

              //when has error, close connection
              pg.on('error', function () {
                _this2.close();
              });
              pg.on('end', function () {
                _this2.close();
              });
              pg.on('close', function () {
                _this2.close();
              });
              this.pg = pg;
              return _context.abrupt('return', pg);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getPG() {
      return _ref.apply(this, arguments);
    }

    return getPG;
  }();
  /**
   * get connection
   * @return {} []
   */


  _class.prototype.getConnection = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var _this3 = this;

      var pg, config, connectionStr;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.connection) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', this.connection);

            case 2:
              _context2.next = 4;
              return this.getPG();

            case 4:
              pg = _context2.sent;
              config = this.config;
              connectionStr = 'postgres://' + config.user + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.database;
              return _context2.abrupt('return', think.await(connectionStr, function () {
                var deferred = think.defer();
                pg.connect(_this3.config, function (err, client, done) {
                  _this3.logConnect(connectionStr, 'postgre');
                  if (err) {
                    deferred.reject(err);
                  } else {
                    _this3.connection = client;
                    _this3.release = done;
                    deferred.resolve(client);
                  }
                });
                return deferred.promise;
              }));

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getConnection() {
      return _ref2.apply(this, arguments);
    }

    return getConnection;
  }();
  /**
   * query
   * @return {Promise} []
   */


  _class.prototype.query = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(sql) {
      var _this4 = this;

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
              fn = think.promisify(connection.query, connection);
              promise = fn(sql).then(function (data) {
                _this4.release();
                if (_this4.config.log_sql) {
                  think.log(sql, 'SQL', startTime);
                }
                return data;
              }).catch(function (err) {
                _this4.release();

                //when socket is closed, try it
                if (err.code === 'EPIPE') {
                  _this4.close();
                  return _this4.query(sql);
                }

                if (_this4.config.log_sql) {
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

    function query(_x) {
      return _ref3.apply(this, arguments);
    }

    return query;
  }();
  /**
   * execute sql
   * @param  {Array} args []
   * @return {Promise}         []
   */


  _class.prototype.execute = function execute() {
    return this.query.apply(this, arguments);
  };
  /**
   * close connection
   * @return {} []
   */


  _class.prototype.close = function close() {
    if (this.connection) {
      this.connection.end();
      this.connection = null;
    }
  };

  return _class;
}(_base2.default);

exports.default = _class;