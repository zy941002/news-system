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

var moment = require('moment');

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  _class.prototype.fetchAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var _this2 = this;

      var where, news, __this, promise, results;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.setCorsHeader();
              where = this.get();
              _context4.next = 4;
              return this.model('news').fetchNews(where);

            case 4:
              news = _context4.sent;
              __this = this;
              promise = [];

              news.forEach(function () {
                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(item, index) {
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          promise.push(new _promise2.default(function () {
                            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resolve, reject) {
                              var link, user, res;
                              return _regenerator2.default.wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _context2.next = 2;
                                      return __this.model('news_cate').where({ news_id: item.id }).select();

                                    case 2:
                                      link = _context2.sent;

                                      link.forEach(function () {
                                        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(item, index) {
                                          var cate, data;
                                          return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                              switch (_context.prev = _context.next) {
                                                case 0:
                                                  cate = "cate";
                                                  _context.next = 3;
                                                  return __this.model('category').where({ id: item.cate_id }).select();

                                                case 3:
                                                  data = _context.sent;

                                                  link[index][cate] = data[0];

                                                case 5:
                                                case 'end':
                                                  return _context.stop();
                                              }
                                            }
                                          }, _callee, _this2);
                                        }));

                                        return function (_x5, _x6) {
                                          return _ref4.apply(this, arguments);
                                        };
                                      }());
                                      _context2.next = 6;
                                      return __this.model('user').where({ id: item.author_id }).select();

                                    case 6:
                                      user = _context2.sent;
                                      res = {
                                        cate: link,
                                        user: user[0]
                                      };

                                      resolve(res);

                                    case 9:
                                    case 'end':
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2, _this2);
                            }));

                            return function (_x3, _x4) {
                              return _ref3.apply(this, arguments);
                            };
                          }()));

                        case 1:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this2);
                }));

                return function (_x, _x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
              _context4.next = 10;
              return _promise2.default.all(promise);

            case 10:
              results = _context4.sent;

              news.map(function (item, index) {
                var extra = 'extra';
                return item[extra] = results[index];
              });
              return _context4.abrupt('return', this.success(news));

            case 13:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function fetchAction() {
      return _ref.apply(this, arguments);
    }

    return fetchAction;
  }();
  // 删除分类


  _class.prototype.delcateAction = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var where, affectedRows;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.setCorsHeader();
              where = this.get();
              _context5.next = 4;
              return this.model('news_cate').where(where).delete();

            case 4:
              affectedRows = _context5.sent;

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function delcateAction() {
      return _ref5.apply(this, arguments);
    }

    return delcateAction;
  }();

  // 新增分类


  _class.prototype.addCateAction = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var where;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this.setCorsHeader();
              where = this.post();

              console.log(where);

            case 3:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function addCateAction() {
      return _ref6.apply(this, arguments);
    }

    return addCateAction;
  }();

  // 删除新闻


  _class.prototype.removeAction = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      var model, id, affectedRows;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.setCorsHeader();
              model = this.model('news');
              id = this.get('id');
              _context7.next = 5;
              return model.where({ id: id }).delete();

            case 5:
              affectedRows = _context7.sent;
              return _context7.abrupt('return', this.success(affectedRows));

            case 7:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function removeAction() {
      return _ref7.apply(this, arguments);
    }

    return removeAction;
  }();

  _class.prototype.addnewsAction = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
      var model, where, now, id, title, content, pass, extra, affectedRows, _affectedRows;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.setCorsHeader();
              model = this.model('news');
              where = this.post();
              now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
              id = where.id, title = where.title, content = where.content, pass = where.pass, extra = where.extra;

              console.log(where);
              if (!think.isEmpty(id)) {
                affectedRows = model.where({ id: id }).update({ title: title, timeflag: now, content: content, pass: parseInt(pass) });
              } else {
                _affectedRows = model.add({ title: title, timeflag: now, content: content, pass: parseInt(pass), author_id: extra.user.id });
              }
              // else{
              //   console.log(`新增`);
              //   let affectedRows = model.add({title:title,timeflag:now,content: content,pass : parseInt(pass)})
              // }

              return _context8.abrupt('return', this.success('addnews'));

            case 8:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function addnewsAction() {
      return _ref8.apply(this, arguments);
    }

    return addnewsAction;
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