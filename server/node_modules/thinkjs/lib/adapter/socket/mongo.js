'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * mongodb socket
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

    this.config = think.extend({}, {
      host: '127.0.0.1'
    }, config);
    this.config.port = this.config.port || 27017;
  };
  /**
   * get connection
   * @return {Promise} []
   */


  _class.prototype.getConnection = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var mongo, config, auth, options, hostStr, str;
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
              return think.npm('mongodb');

            case 4:
              mongo = _context.sent;
              config = this.config;
              auth = '';


              this.mongo = mongo;
              //connect with auth
              if (this.config.user) {
                auth = config.user + ':' + config.password + '@';
              }
              // connection options
              // http://mongodb.github.io/node-mongodb-native/2.0/tutorials/urls/
              options = '';

              if (config.options) {
                options = '?' + _querystring2.default.stringify(config.options);
              }

              //many hosts
              hostStr = '';

              if (think.isArray(config.host)) {
                hostStr = config.host.map(function (item, i) {
                  return item + ':' + (config.port[i] || config.port[0]);
                }).join(',');
              } else {
                hostStr = config.host + ':' + config.port;
              }

              str = 'mongodb://' + auth + hostStr + '/' + config.database + options;
              return _context.abrupt('return', think.await(str, function () {
                var fn = think.promisify(mongo.MongoClient.connect, mongo.MongoClient);
                var promise = fn(str, _this2.config).then(function (connection) {
                  _this2.logConnect(str, 'mongodb');
                  //set logger level
                  if (config.log_level) {
                    mongo.Logger.setLevel(config.log_level);
                  }
                  connection.on('error', function () {
                    _this2.close();
                  });
                  connection.on('close', function () {
                    _this2.connection = null;
                  });
                  _this2.connection = connection;
                  return connection;
                }).catch(function (err) {
                  _this2.logConnect(str, 'mongodb');
                  return _promise2.default.reject(err);
                });
                var err = new Error(str);
                return think.error(promise, err);
              }));

            case 15:
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

  return _class;
}(_base2.default);

exports.default = _class;