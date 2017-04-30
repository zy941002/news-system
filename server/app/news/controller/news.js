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

var _base = require('../../common/base/base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('moment');

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  _class.prototype.findlistsAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var news;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.model('user').join({
                news: {
                  join: "right",
                  on: ["id", "author_id"]
                }
              }).page(this.page, 10).countSelect();

            case 2:
              news = _context.sent;
              return _context.abrupt('return', this.success(news));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function findlistsAction() {
      return _ref.apply(this, arguments);
    }

    return findlistsAction;
  }();

  _class.prototype.findAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var news, categoryInstance;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.model('news').where({ "news.id": this.id }).join({
                user: {
                  on: ["author_id", "id"]
                }
              }).fieldReverse("password,id").find();

            case 2:
              news = _context2.sent;
              categoryInstance = this.controller('category', 'category');
              _context2.next = 6;
              return this.action(categoryInstance, 'find');

            case 6:
              news['categories'] = _context2.sent;
              return _context2.abrupt('return', this.success(news));

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function findAction() {
      return _ref2.apply(this, arguments);
    }

    return findAction;
  }();

  _class.prototype.removeAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var model, id, affectedRows;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              model = this.model('news');
              id = this.get('id');
              _context3.next = 4;
              return model.where({ id: id }).delete();

            case 4:
              affectedRows = _context3.sent;
              return _context3.abrupt('return', this.success(affectedRows));

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function removeAction() {
      return _ref3.apply(this, arguments);
    }

    return removeAction;
  }();

  _class.prototype.addnewsAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var _this2 = this;

      var model, news, id, title, content, pass, top, imageurl, preview, user, categories, affectedRows, res, promise;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              model = this.model('news');
              news = this.post();
              id = news.id, title = news.title, content = news.content, pass = news.pass, top = news.top, imageurl = news.imageurl, preview = news.preview, user = news.user, categories = news.categories;

              if (think.isEmpty(id)) {
                _context5.next = 10;
                break;
              }

              _context5.next = 6;
              return model.where({ id: id }).update({
                title: title,
                content: content,
                pass: Number(pass),
                top: Number(top),
                imageurl: imageurl,
                preview: preview
              });

            case 6:
              affectedRows = _context5.sent;
              return _context5.abrupt('return', this.success('\u66F4\u65B0\u65B0\u95FB\u6210\u529F'));

            case 10:
              _context5.prev = 10;
              _context5.next = 13;
              return model.add({
                title: title,
                create_time: this.now,
                content: content,
                pass: Number(pass),
                top: Number(top),
                author_id: user.id,
                imageurl: imageurl,
                preview: preview
              });

            case 13:
              res = _context5.sent;
              promise = [];

              news.categories.forEach(function () {
                var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(item, index) {
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return promise.push(_this2.model('news_cate').add({ news_id: res, cate_id: item.id }));

                        case 2:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this2);
                }));

                return function (_x, _x2) {
                  return _ref5.apply(this, arguments);
                };
              }());
              _promise2.default.all(promise);
              return _context5.abrupt('return', this.success('\u6DFB\u52A0\u65B0\u95FB\u6210\u529F'));

            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5['catch'](10);

              console.log(_context5.t0);
              return _context5.abrupt('return', this.fail(_context5.t0));

            case 24:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[10, 20]]);
    }));

    function addnewsAction() {
      return _ref4.apply(this, arguments);
    }

    return addnewsAction;
  }();

  _class.prototype.topAction = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var news, datime, res;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              news = this.model('news');
              datime = moment.utc(this.get('date')).format('YYYY-MM-DD');
              _context6.next = 4;
              return news.where({ create_time: datime, top: 1 }).select();

            case 4:
              res = _context6.sent;
              return _context6.abrupt('return', this.success(res));

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function topAction() {
      return _ref6.apply(this, arguments);
    }

    return topAction;
  }();

  _class.prototype.untopAction = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      var news, datime, res;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              news = this.model('news');
              datime = moment.utc(this.get('date')).format('YYYY-MM-DD');
              _context7.next = 4;
              return news.where({ create_time: datime, top: ["!=", 1] }).select();

            case 4:
              res = _context7.sent;
              return _context7.abrupt('return', this.success(res));

            case 6:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function untopAction() {
      return _ref7.apply(this, arguments);
    }

    return untopAction;
  }();

  _class.prototype.updateclickAction = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
      var _post, id, clicked, res;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _post = this.post(), id = _post.id, clicked = _post.clicked;
              _context8.next = 3;
              return this.model('news').where({ id: id }).update({ clicked: clicked });

            case 3:
              res = _context8.sent;
              return _context8.abrupt('return', this.success(res));

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function updateclickAction() {
      return _ref8.apply(this, arguments);
    }

    return updateclickAction;
  }();

  _class.prototype.categorylistAction = function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
      var news, cate, where, create_time, res;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              news = this.model('news'), cate = this.model('category'), where = {}, create_time = moment(this.get('create_time') || new Date()).format('YYYY-MM-DD');

              if (this.id) {
                where = {
                  create_time: create_time,
                  "cate_id": this.id
                };
              } else {
                where = {
                  create_time: create_time
                };
              }
              _context9.next = 4;
              return this.model('news_cate').join({
                news: {
                  on: ["news_id", "news.id"]
                },
                category: {
                  on: ["cate_id", "category.id"]
                }
              }).where(where).select();

            case 4:
              res = _context9.sent;
              return _context9.abrupt('return', this.json(res));

            case 6:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function categorylistAction() {
      return _ref9.apply(this, arguments);
    }

    return categorylistAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=news.js.map