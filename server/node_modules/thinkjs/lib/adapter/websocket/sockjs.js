'use strict';

exports.__esModule = true;

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

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * websocket adapter for sockjs
 */
var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * run
   * @return {} []
   */
  _class.prototype.run = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this2 = this;

      var sockjs, options, sockjsServer, messages, open, close, path;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return think.npm('sockjs');

            case 2:
              sockjs = _context.sent;
              options = {
                log: function log() {}
              };

              if (this.config.sockjs_url) {
                options.sockjs_url = this.config.sockjs_url;
              }
              sockjsServer = sockjs.createServer(options);

              this.sockjs = sockjsServer;

              //get message type
              messages = think.extend({}, this.config.messages);
              open = messages.open;

              delete messages.open;
              close = messages.close;

              delete messages.close;

              thinkCache(thinkCache.WEBSOCKET, []);

              sockjsServer.on('connection', function (socket) {

                _this2.addSocket(socket);

                //open connection
                if (open) {
                  _this2.message(open, undefined, socket);
                }

                socket.on('close', function () {
                  _this2.removeSocket(socket);

                  if (close) {
                    _this2.message(close, undefined, socket);
                  }
                });

                //msg is {event: event, data: data}
                socket.on('data', function (msg) {
                  try {
                    msg = JSON.parse(msg);
                    if (msg.event && messages[msg.event]) {
                      _this2.message(messages[msg.event], msg.data, socket);
                    }
                  } catch (e) {}
                });
              });

              path = this.config.path || '/sockjs';

              sockjsServer.installHandlers(this.server, { prefix: path });

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function run() {
      return _ref.apply(this, arguments);
    }

    return run;
  }();
  /**
   * add socket
   * @param {Object} socket []
   */


  _class.prototype.addSocket = function addSocket(socket) {
    var sockets = thinkCache(thinkCache.WEBSOCKET);
    sockets.push(socket);
  };
  /**
   * remove socket
   * @param  {Object} socket []
   * @return {}        []
   */


  _class.prototype.removeSocket = function removeSocket(socket) {
    var sockets = thinkCache(thinkCache.WEBSOCKET);
    sockets.some(function (item, index) {
      if (item.id === socket.id) {
        sockets.splice(index, 1);
        return true;
      }
    });
  };
  /**
   * emit data
   * @param  {String} event []
   * @param  {Mixed} data  []
   * @return {}       []
   */


  _class.prototype.emit = function emit(event, data) {
    this.socket.write((0, _stringify2.default)({ event: event, data: data }));
  };
  /**
   * broadcast data
   * @param  {String} event []
   * @param  {Mixed} data  []
   * @return {}       []
   */


  _class.prototype.broadcast = function broadcast(event, data, containSelf) {
    var _this3 = this;

    var sockets = thinkCache(thinkCache.WEBSOCKET);
    sockets.forEach(function (socket) {
      if (!containSelf && socket.id === _this3.socket.id) {
        return;
      }
      socket.write((0, _stringify2.default)({ event: event, data: data }));
    });
  };
  /**
   * deal message
   * @param  {String} url  []
   * @param  {Mixed} data []
   * @return {}      []
   */


  _class.prototype.message = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(url, data, socket) {
      var http, instance;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (url[0] !== '/') {
                url = '/' + url;
              }

              _context2.next = 3;
              return think.http({
                url: url,
                headers: socket.headers,
                ip: socket.remoteAddress
              });

            case 3:
              http = _context2.sent;


              http.data = data;
              http.socket = socket;
              http.sockjs = this.sockjs;

              http.socketEmit = this.emit;
              http.socketBroadcast = this.broadcast;

              instance = new this.app(http);
              return _context2.abrupt('return', instance.run());

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function message(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    }

    return message;
  }();

  return _class;
}(_base2.default);

exports.default = _class;