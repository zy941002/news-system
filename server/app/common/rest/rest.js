// +----------------------------------------------------------------------
// | NEWS [ 新闻网站管理系统 ]
// +----------------------------------------------------------------------
// | Copyright (c) inkzhou@gmail.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: zhouying <inkzhou@gmail.com>
// +----------------------------------------------------------------------
'use strict';

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$res) {
  (0, _inherits3.default)(_class, _think$controller$res);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$res.apply(this, arguments));
  }

  /**
   * index action logic
   * @return {} []
   */
  _class.prototype.init = function init(http) {
    _think$controller$res.prototype.init.call(this, http);
    //设置 _method，表示从 GET 参数获取 _method 字段的值
    //如果没有取到，则从 http method 中获取
    this._method = "_method";
  };

  _class.prototype.getAction = _regenerator2.default.mark(function getAction() {
    var data, _modelInstance$where, pk;

    return _regenerator2.default.wrap(function getAction$(_context) {
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
            return _context.abrupt("return", this.success(data));

          case 9:
            _context.next = 11;
            return this.modelInstance.select();

          case 11:
            data = _context.sent;
            return _context.abrupt("return", this.success(data));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, getAction, this);
  });
  _class.prototype.postAction = _regenerator2.default.mark(function postAction() {
    var pk, data, insertId;
    return _regenerator2.default.wrap(function postAction$(_context2) {
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

            return _context2.abrupt("return", this.fail("data is empty"));

          case 7:
            _context2.next = 9;
            return this.modelInstance.add(data);

          case 9:
            insertId = _context2.sent;
            return _context2.abrupt("return", this.success({ id: insertId }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, postAction, this);
  });
  _class.prototype.deleteAction = _regenerator2.default.mark(function deleteAction() {
    var _modelInstance$where2;

    var pk, rows;
    return _regenerator2.default.wrap(function deleteAction$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (this.id) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", this.fail(-1, "params error"));

          case 2:
            _context3.next = 4;
            return this.modelInstance.getPk();

          case 4:
            pk = _context3.sent;
            _context3.next = 7;
            return this.modelInstance.where((_modelInstance$where2 = {}, _modelInstance$where2[pk] = this.id, _modelInstance$where2)).delete();

          case 7:
            rows = _context3.sent;
            return _context3.abrupt("return", this.success({ affectedRows: rows }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, deleteAction, this);
  });
  _class.prototype.putAction = _regenerator2.default.mark(function putAction() {
    var _modelInstance$where3;

    var pk, data, rows;
    return _regenerator2.default.wrap(function putAction$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (this.id) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", this.fail(-1, "params error"));

          case 2:
            _context4.next = 4;
            return this.modelInstance.getPk();

          case 4:
            pk = _context4.sent;
            data = this.get();

            console.log(data);
            delete data[pk];

            if (!think.isEmpty(data)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", this.fail("data is empty"));

          case 10:
            _context4.next = 12;
            return this.modelInstance.where((_modelInstance$where3 = {}, _modelInstance$where3[pk] = this.id, _modelInstance$where3)).update(data);

          case 12:
            rows = _context4.sent;
            return _context4.abrupt("return", this.success({ affectedRows: rows }));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, putAction, this);
  });

  // 找不到方法时调用

  _class.prototype.__before = function __before() {
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with, Content-Type");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header('Access-Control-Allow-Credentials', true);
    var method = this.http.method.toLowerCase();
    if (method === "options") {
      this.end();
      return;
    }
  };

  return _class;
}(think.controller.rest);

exports.default = _class;
//# sourceMappingURL=rest.js.map