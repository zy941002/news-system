'use strict';

exports.__esModule = true;

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

var MysqlSocket = think.adapter('socket', 'mysql');
/**
 * mysql db
 * @type {Class}
 */

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * get mysql socket instance
   * @param  {Object} config []
   * @return {}        []
   */
  _class.prototype.socket = function socket(sql) {
    if (this._socket) {
      return this._socket;
    }
    var config = think.extend({
      sql: sql
    }, this.config);
    this._socket = MysqlSocket.getInstance(config, thinkCache.DB, ['sql']);
    return this._socket;
  };
  /**
   * get table schema
   * @param  {String} table [table name]
   * @return {Promise}       []
   */


  _class.prototype.getSchema = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(table) {
      var data, ret;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.query('SHOW COLUMNS FROM ' + this.parseKey(table));

            case 2:
              data = _context.sent;
              ret = {};

              data.forEach(function (item) {
                ret[item.Field] = {
                  'name': item.Field,
                  'type': item.Type,
                  'required': item.Null === '',
                  //'default': item.Default,
                  'primary': item.Key === 'PRI',
                  'unique': item.Key === 'UNI',
                  'auto_increment': item.Extra.toLowerCase() === 'auto_increment'
                };
              });
              return _context.abrupt('return', ret);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getSchema(_x) {
      return _ref.apply(this, arguments);
    }

    return getSchema;
  }();
  /**
   * parse key
   * @param  {String} key []
   * @return {String}     []
   */


  _class.prototype.parseKey = function parseKey() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    key = key.trim();
    if (think.isEmpty(key)) {
      return '';
    }
    if (think.isNumberString(key)) {
      return key;
    }
    if (!/[,\'\"\*\(\)`.\s]/.test(key)) {
      key = '`' + key + '`';
    }
    return key;
  };

  return _class;
}(_base2.default);

exports.default = _class;