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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  _class.prototype.fetchAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var where, news, __this, promise, results;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.setCorsHeader();
              where = this.get();
              _context.next = 4;
              return this.model('news').fetchNews(where);

            case 4:
              news = _context.sent;
              __this = this;
              promise = [];

              news.forEach(function (item, index) {
                promise.push(new _promise2.default(function (resolve, reject) {
                  __this.model('cate').where({ id: item.cate_id }).select();
                  resolve(__this.model('user').where({ id: item.author_id }).select());
                }));
              });
              _context.next = 10;
              return _promise2.default.all(promise);

            case 10:
              results = _context.sent;

              news.map(function (item, index) {
                var author = 'author';
                return item[author] = results[index][0];
              });
              return _context.abrupt('return', this.success(news));

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function fetchAction() {
      return _ref.apply(this, arguments);
    }

    return fetchAction;
  }();

  _class.prototype.removeAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var model, id, affectedRows;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.setCorsHeader();
              model = this.model('news');
              id = this.get('id');
              _context2.next = 5;
              return model.where({ id: id }).delete();

            case 5:
              affectedRows = _context2.sent;
              return _context2.abrupt('return', this.success(affectedRows));

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function removeAction() {
      return _ref2.apply(this, arguments);
    }

    return removeAction;
  }();

  _class.prototype.setCorsHeader = function setCorsHeader() {
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with,Content-Type");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  };

  return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=news.js.map