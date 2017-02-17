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

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SqliteSocket = think.adapter('socket', 'sqlite');
/**
 * sqlite db
 */

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * get sqlite socket instance
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
    this._socket = SqliteSocket.getInstance(config, thinkCache.DB, ['sql']);
    return this._socket;
  };
  /**
   * get table info
   * @param  {String} table [table name]
   * @return {Promise}       []
   */


  _class.prototype.getSchema = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(table) {
      var _this2 = this;

      var fieldPromise, indexPromise, ret, _ref2, data, indexes;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fieldPromise = this.query('PRAGMA table_info( ' + table + ' )');
              indexPromise = this.query('PRAGMA INDEX_LIST( ' + table + ' )').then(function (list) {
                var indexes = {};
                var promises = list.map(function (item) {
                  if (item.unique) {
                    return _this2.query('PRAGMA index_info( ' + item.name + ' )').then(function (data) {
                      data.forEach(function (item) {
                        indexes[item.name] = { unique: true };
                      });
                    });
                  }
                });
                return _promise2.default.all(promises).then(function () {
                  return indexes;
                });
              });
              ret = {};
              _context.next = 5;
              return _promise2.default.all([fieldPromise, indexPromise]);

            case 5:
              _ref2 = _context.sent;
              data = _ref2[0];
              indexes = _ref2[1];

              data.forEach(function (item) {
                ret[item.name] = {
                  name: item.name,
                  type: item.type,
                  required: !!item.notnull,
                  //default: item.dflt_value,
                  primary: !!item.pk,
                  auto_increment: false,
                  unique: !!(!item.pk && indexes[item.name] && indexes[item.name].unique)
                };
              });
              return _context.abrupt('return', ret);

            case 10:
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
   * start transaction
   * @return {Promise} []
   */


  _class.prototype.startTrans = function startTrans() {
    if (this.transTimes === 0) {
      this.transTimes++;
      return this.execute('BEGIN TRANSACTION');
    }
    this.transTimes++;
    return _promise2.default.resolve();
  };
  /**
   * escape string
   * @param  {String} str []
   * @return {String}     []
   */


  _class.prototype.escapeString = function escapeString(str) {
    return str.replace(/\'/g, '\'\'');
  };
  /**
   * parse limit
   * @param  {Array} limit []
   * @return {String}       []
   */


  _class.prototype.parseLimit = function parseLimit(limit) {
    if (think.isEmpty(limit)) {
      return '';
    }
    if (think.isNumber(limit)) {
      return ' LIMIT ' + limit;
    }
    if (think.isString(limit)) {
      limit = limit.split(/\s*,\s*/);
    }
    if (limit[1]) {
      return ' LIMIT ' + (limit[1] | 0) + ' OFFSET ' + (limit[0] | 0);
    }
    return ' LIMIT ' + (limit[0] | 0);
  };

  return _class;
}(_base2.default);

exports.default = _class;