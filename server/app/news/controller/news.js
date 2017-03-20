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
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var _this2 = this;

      var where, news, __this, promise, results;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.setCorsHeader();
              where = this.get();
              _context5.next = 4;
              return this.model('news').fetchNews(where);

            case 4:
              news = _context5.sent;
              __this = this;
              promise = [];


              news.data.forEach(function () {
                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(item, index) {
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:

                          promise.push(new _promise2.default(function () {
                            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(resolve, reject) {
                              var cmt, link, user, res;
                              return _regenerator2.default.wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      _context3.next = 2;
                                      return __this.model('comments').where({ newsid: item.id }).select();

                                    case 2:
                                      cmt = _context3.sent;


                                      cmt.forEach(function () {
                                        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(item, index) {
                                          var user, cmtuser;
                                          return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                              switch (_context.prev = _context.next) {
                                                case 0:
                                                  user = 'user';
                                                  _context.next = 3;
                                                  return __this.model('user').where({ id: item.userid }).select();

                                                case 3:
                                                  cmtuser = _context.sent;

                                                  cmt[index][user] = cmtuser[0];

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

                                      _context3.next = 6;
                                      return __this.model('news_cate').where({ news_id: item.id }).select();

                                    case 6:
                                      link = _context3.sent;

                                      link.forEach(function () {
                                        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(item, index) {
                                          var cate, data;
                                          return _regenerator2.default.wrap(function _callee2$(_context2) {
                                            while (1) {
                                              switch (_context2.prev = _context2.next) {
                                                case 0:
                                                  cate = "cate";
                                                  _context2.next = 3;
                                                  return __this.model('category').where({ id: item.cate_id }).select();

                                                case 3:
                                                  data = _context2.sent;

                                                  link[index][cate] = data[0];

                                                case 5:
                                                case 'end':
                                                  return _context2.stop();
                                              }
                                            }
                                          }, _callee2, _this2);
                                        }));

                                        return function (_x7, _x8) {
                                          return _ref5.apply(this, arguments);
                                        };
                                      }());

                                      _context3.next = 10;
                                      return __this.model('user').where({ id: item.author_id }).select();

                                    case 10:
                                      user = _context3.sent;
                                      res = {
                                        cate: link,
                                        user: user[0],
                                        comment: cmt
                                      };

                                      resolve(res);

                                    case 13:
                                    case 'end':
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3, _this2);
                            }));

                            return function (_x3, _x4) {
                              return _ref3.apply(this, arguments);
                            };
                          }()));

                        case 1:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this2);
                }));

                return function (_x, _x2) {
                  return _ref2.apply(this, arguments);
                };
              }());

              _context5.next = 10;
              return _promise2.default.all(promise);

            case 10:
              results = _context5.sent;


              news.data.map(function (item, index) {
                var extra = 'extra';
                return item[extra] = results[index];
              });

              return _context5.abrupt('return', this.success(news));

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function fetchAction() {
      return _ref.apply(this, arguments);
    }

    return fetchAction;
  }();

  _class.prototype.delcateAction = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var where, affectedRows;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this.setCorsHeader();
              where = this.get();
              _context6.next = 4;
              return this.model('news_cate').where(where).delete();

            case 4:
              affectedRows = _context6.sent;

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function delcateAction() {
      return _ref6.apply(this, arguments);
    }

    return delcateAction;
  }();

  _class.prototype.addCateAction = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      var where;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.setCorsHeader();
              where = this.post();

              console.log(where);

            case 3:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function addCateAction() {
      return _ref7.apply(this, arguments);
    }

    return addCateAction;
  }();

  _class.prototype.removeAction = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
      var model, id, affectedRows;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.setCorsHeader();
              model = this.model('news');
              id = this.get('id');
              _context8.next = 5;
              return model.where({ id: id }).delete();

            case 5:
              affectedRows = _context8.sent;
              return _context8.abrupt('return', this.success(affectedRows));

            case 7:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function removeAction() {
      return _ref8.apply(this, arguments);
    }

    return removeAction;
  }();

  _class.prototype.addnewsAction = function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
      var _this3 = this;

      var model, where, now, id, title, content, pass, extra, cate, affectedRows;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              this.setCorsHeader();
              model = this.model('news');
              where = this.post();
              now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
              id = where.id, title = where.title, content = where.content, pass = where.pass, extra = where.extra;
              cate = this.model('news_cate');

              if (think.isEmpty(id)) {
                _context11.next = 13;
                break;
              }

              extra.cate.forEach(function () {
                var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(item, index) {
                  var affectedRows;
                  return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return cate.thenAdd({ news_id: id, cate_id: item.cate.id }, { news_id: id, cate_id: item.cate.id });

                        case 2:
                          affectedRows = _context9.sent;

                        case 3:
                        case 'end':
                          return _context9.stop();
                      }
                    }
                  }, _callee9, _this3);
                }));

                return function (_x9, _x10) {
                  return _ref10.apply(this, arguments);
                };
              }());
              _context11.next = 10;
              return model.where({ id: id }).update({ title: title, timeflag: now, content: content, pass: Number(pass) });

            case 10:
              affectedRows = _context11.sent;
              _context11.next = 23;
              break;

            case 13:
              _context11.prev = 13;
              _context11.next = 16;
              return model.add({ title: title, timeflag: now, content: content, pass: parseInt(pass), author_id: extra.user.id });

            case 16:
              extra.cate.forEach(function () {
                var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(item, index) {
                  var affectedRows;
                  return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return cate.add({ news_id: resid, cate_id: item.cate.id });

                        case 2:
                          affectedRows = _context10.sent;

                        case 3:
                        case 'end':
                          return _context10.stop();
                      }
                    }
                  }, _callee10, _this3);
                }));

                return function (_x11, _x12) {
                  return _ref11.apply(this, arguments);
                };
              }());
              return _context11.abrupt('return', this.success('\u6DFB\u52A0\u65B0\u95FB\u6210\u529F'));

            case 20:
              _context11.prev = 20;
              _context11.t0 = _context11['catch'](13);
              return _context11.abrupt('return', this.fail(_context11.t0));

            case 23:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this, [[13, 20]]);
    }));

    function addnewsAction() {
      return _ref9.apply(this, arguments);
    }

    return addnewsAction;
  }();

  _class.prototype.categorylistAction = function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
      var _this4 = this;

      var _get, id, news, cate, cates, promise, where, data;

      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              this.setCorsHeader();
              _get = this.get(), id = _get.id;
              news = this.model('news');
              cate = this.model('category');
              cates = [], promise = [];
              where = {};

              if (id) {
                where = {
                  cate_id: id
                };
              }
              _context13.next = 9;
              return this.model('news_cate').where(where).select();

            case 9:
              cates = _context13.sent;


              cates.forEach(function (item, index) {
                promise.push(new _promise2.default(function () {
                  var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(resolve, reject) {
                    var cateitem, newsitem, res;
                    return _regenerator2.default.wrap(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            _context12.next = 2;
                            return cate.where({ id: item.cate_id }).select();

                          case 2:
                            cateitem = _context12.sent;
                            _context12.next = 5;
                            return news.where({ id: item.news_id }).select();

                          case 5:
                            newsitem = _context12.sent;
                            res = {
                              cate: cateitem[0],
                              news: newsitem[0]
                            };

                            resolve(res);

                          case 8:
                          case 'end':
                            return _context12.stop();
                        }
                      }
                    }, _callee12, _this4);
                  }));

                  return function (_x13, _x14) {
                    return _ref13.apply(this, arguments);
                  };
                }()));
              });

              _context13.next = 13;
              return _promise2.default.all(promise);

            case 13:
              data = _context13.sent;
              return _context13.abrupt('return', this.success(data));

            case 15:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function categorylistAction() {
      return _ref12.apply(this, arguments);
    }

    return categorylistAction;
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