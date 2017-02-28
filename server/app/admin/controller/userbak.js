'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _base = require('../../common/base/base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var moment = require('moment');

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  /**
   * index action
   * @return {Promise} []
   */
  _class.prototype.indexAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
              this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
              this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
              this.header('Access-Control-Allow-Credentials', 'true');
              _context.next = 6;
              return this.model('user').select();

            case 6:
              data = _context.sent;
              return _context.abrupt('return', this.success(data));

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function indexAction() {
      return _ref.apply(this, arguments);
    }

    return indexAction;
  }();

  _class.prototype.fetchuserAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var where, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
              this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
              this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
              this.header('Access-Control-Allow-Credentials', 'true');
              where = this.get();
              _context2.next = 7;
              return this.model('user').where(where).select();

            case 7:
              data = _context2.sent;
              return _context2.abrupt('return', this.json({ data: data }));

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function fetchuserAction() {
      return _ref2.apply(this, arguments);
    }

    return fetchuserAction;
  }();

  _class.prototype.loginAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var where, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              where = this.post();
              _context3.next = 3;
              return this.model('user').where(where).select();

            case 3:
              data = _context3.sent;

              if (!think.isEmpty(data)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt('return', this.fail({ errorno: -1 }, "用户名或密码错误"));

            case 8:
              return _context3.abrupt('return', this.success(data));

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function loginAction() {
      return _ref3.apply(this, arguments);
    }

    return loginAction;
  }();

  _class.prototype.addAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var method, model, params, id, file, user, now, affectedRows, _affectedRows;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              method = this.http.method.toLowerCase();

              if (!(method === 'options')) {
                _context4.next = 9;
                break;
              }

              this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
              this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
              this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
              this.header('Access-Control-Allow-Credentials', 'true');
              this.end();
              _context4.next = 29;
              break;

            case 9:
              model = this.model('user');
              params = this.post();
              id = this.post('id');
              file = (0, _stringify2.default)(this.post('file'));
              user = this.model('user');
              now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

              this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
              this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
              this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
              this.header('Access-Control-Allow-Credentials', 'true');

              if (think.isEmpty(id)) {
                _context4.next = 26;
                break;
              }

              _context4.next = 22;
              return user.where({ id: id }).update((0, _assign2.default)(params, { file: file }, { createTime: now }));

            case 22:
              affectedRows = _context4.sent;
              return _context4.abrupt('return', this.success(affectedRows));

            case 26:
              _context4.next = 28;
              return user.add((0, _assign2.default)(params, { file: file }, { createTime: now }));

            case 28:
              _affectedRows = _context4.sent;

            case 29:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function addAction() {
      return _ref4.apply(this, arguments);
    }

    return addAction;
  }();

  //   let model = this.model(`user`);
  //   let params = this.post();
  //   let id = this.post(`id`);
  //   let file = JSON.stringify(this.post(`file`));
  //   let user = this.model(`user`);
  //   let now =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  //   // 更新用户
  //   if(!think.isEmpty(id)){
  //       let affectedRows = await user.where({id:id}).update(Object.assign(params,{file:file},{createTime:now}));
  //       return this.success(affectedRows);
  //   }
  //   //新增用户
  //   else{
  //     let method = this.http.method.toLowerCase();
  //     if(method === 'options'){
  //       this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
  //       this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
  //       this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
  //       this.header('Access-Control-Allow-Credentials', 'true');
  //       return;
  //     }
  //     let affectedRows = await user.add(Object.assign(params,{file:file},{createTime:now}));
  //   }
  // }


  return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=userbak.js.map