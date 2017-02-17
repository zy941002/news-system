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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * REST Base Controller
 * @return {} []
 */
var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  _class.prototype.init = function init(http) {
    _think$controller$bas.prototype.init.call(this, http);

    this._isRest = true;
    this._method = '';

    this.resource = this.getResource();
    this.id = this.getId();
    this.modelInstance = this.model(this.resource);
  };
  /**
   * get resource
   * @return {String} [resource name]
   */


  _class.prototype.getResource = function getResource() {
    var filename = this.__filename || __filename;
    var last = filename.lastIndexOf(_path2.default.sep);
    return filename.substr(last + 1, filename.length - last - 4);
  };
  /**
   * get resource id
   * @return {String} []
   */


  _class.prototype.getId = function getId() {
    var id = this.get('id');
    if (id && think.isString(id) || think.isNumber(id)) {
      return id;
    }
    var last = this.http.pathname.split('/').slice(-1)[0];
    if (last !== this.resource) {
      return last;
    }
    return '';
  };
  /**
   * get resource
   * @return {Promise} []
   */


  _class.prototype.getAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var data, _modelInstance$where, pk;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = void 0;

              if (!this.id) {
                _context.next = 9;
                break;
              }

              _context.next = 4;
              return this.modelInstance.getPk();

            case 4:
              pk = _context.sent;
              _context.next = 7;
              return this.modelInstance.where((_modelInstance$where = {}, _modelInstance$where[pk] = this.id, _modelInstance$where)).find();

            case 7:
              data = _context.sent;
              return _context.abrupt('return', this.success(data));

            case 9:
              _context.next = 11;
              return this.modelInstance.select();

            case 11:
              data = _context.sent;
              return _context.abrupt('return', this.success(data));

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getAction() {
      return _ref.apply(this, arguments);
    }

    return getAction;
  }();
  /**
   * put resource
   * @return {Promise} []
   */


  _class.prototype.postAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var pk, data, insertId;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.modelInstance.getPk();

            case 2:
              pk = _context2.sent;
              data = this.post();

              delete data[pk];

              if (!think.isEmpty(data)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', this.fail('data is empty'));

            case 7:
              _context2.next = 9;
              return this.modelInstance.add(data);

            case 9:
              insertId = _context2.sent;
              return _context2.abrupt('return', this.success({ id: insertId }));

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function postAction() {
      return _ref2.apply(this, arguments);
    }

    return postAction;
  }();
  /**
   * delete resource
   * @return {Promise} []
   */


  _class.prototype.deleteAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var _modelInstance$where2;

      var pk, rows;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.id) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', this.fail('params error'));

            case 2:
              _context3.next = 4;
              return this.modelInstance.getPk();

            case 4:
              pk = _context3.sent;
              _context3.next = 7;
              return this.modelInstance.where((_modelInstance$where2 = {}, _modelInstance$where2[pk] = this.id, _modelInstance$where2)).delete();

            case 7:
              rows = _context3.sent;
              return _context3.abrupt('return', this.success({ affectedRows: rows }));

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteAction() {
      return _ref3.apply(this, arguments);
    }

    return deleteAction;
  }();
  /**
   * update resource
   * @return {Promise} []
   */


  _class.prototype.putAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var _modelInstance$where3;

      var pk, data, rows;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this.id) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', this.fail('params error'));

            case 2:
              _context4.next = 4;
              return this.modelInstance.getPk();

            case 4:
              pk = _context4.sent;
              data = this.post();

              delete data[pk];

              if (!think.isEmpty(data)) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt('return', this.fail('data is empty'));

            case 9:
              _context4.next = 11;
              return this.modelInstance.where((_modelInstance$where3 = {}, _modelInstance$where3[pk] = this.id, _modelInstance$where3)).update(data);

            case 11:
              rows = _context4.sent;
              return _context4.abrupt('return', this.success({ affectedRows: rows }));

            case 13:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function putAction() {
      return _ref4.apply(this, arguments);
    }

    return putAction;
  }();
  /**
   * call
   * @return {Promise} []
   */


  _class.prototype.__call = function __call() {
    return this.fail(think.locale('ACTION_INVALID', this.http.action, this.http.url));
  };

  return _class;
}(think.controller.base);

exports.default = _class;