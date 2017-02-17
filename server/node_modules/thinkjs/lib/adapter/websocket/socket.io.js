'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
 * websocket adapter for socket.io
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

      var socketio, io, allow_origin, messages;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return think.npm('socket.io');

            case 2:
              socketio = _context.sent;
              io = socketio(this.server);

              this.io = io;

              //set io adapter, must be a function
              //http://socket.io/docs/using-multiple-nodes/
              if (this.config.adp) {
                io.adapter(this.config.adp());
              }

              //Sets the path v under which engine.io and the static files will be served. Defaults to /socket.io.
              if (this.config.path) {
                io.path(this.config.path);
              }

              //Sets the allowed origins v. Defaults to any origins being allowed.
              allow_origin = this.config.allow_origin;

              if (allow_origin) {
                io.origins(this.config.allow_origin);
              }

              //get message type
              messages = think.isArray(this.config.messages) ? this.config.messages : [this.config.messages];

              messages.forEach(function () {
                var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var sc = v.namespace ? io.of(v.namespace) : io;
                _this2.registerSocket(sc, v);
              });

            case 11:
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
   * register namespace of socket, and support multi socket connect
   * eg:
   * export default {
    messages:
        [
            {
                namespace:'/payCount',
                open: 'analysis/erp_pay/open',
                close: 'analysis/erp_pay/close',
                day: 'analysis/erp_pay/day',
                updateFromMq: 'analysis/erp_pay/updateFromMq',
            }
        ]
    };
   * @param io
   * @param messages
     */


  _class.prototype.registerSocket = function registerSocket(io, messages) {
    var _this3 = this;

    var msgKeys = (0, _keys2.default)(messages);
    var open = messages.open;
    delete messages.open;
    var close = messages.close;
    delete messages.close;

    thinkCache(thinkCache.WEBSOCKET, io.sockets.sockets);

    io.on('connection', function (socket) {

      //open connection
      if (open) {
        _this3.message(open, undefined, socket);
      }
      //listen disonnection event
      if (close) {
        socket.on('disconnect', function () {
          _this3.message(close, undefined, socket);
        });
      }

      //listen list of message type
      msgKeys.forEach(function (msgKey) {
        socket.on(msgKey, function (msg) {
          _this3.message(messages[msgKey], msg, socket);
        });
      });
    });
  };
  /**
   * emit socket data
   * @param  {String} event []
   * @param  {Mixed} data  []
   * @return {}       []
   */


  _class.prototype.emit = function emit(event, data) {
    return this.socket.emit(event, data);
  };
  /**
   * broadcast socket data
   * @param  {String} event       []
   * @param  {Mixed} data        []
   * @param  {Boolean} containSelf []
   * @return {}             []
   */


  _class.prototype.broadcast = function broadcast(event, data, containSelf) {
    if (containSelf) {
      this.io.sockets.emit(event, data);
    } else {
      this.socket.broadcast.emit(event, data);
    }
  };
  /**
   * deal message
   * @param  {String} url  []
   * @param  {Mixed} data []
   * @return {}      []
   */


  _class.prototype.message = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(url, data, socket) {
      var request, http, instance;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              request = socket.request;

              if (url[0] !== '/') {
                url = '/' + url;
              }
              request.url = url;
              http = void 0;
              //socket.io c++ client发过来的requet没有res

              if (request.res) {
                _context2.next = 10;
                break;
              }

              _context2.next = 7;
              return think.http(url);

            case 7:
              http = _context2.sent;
              _context2.next = 13;
              break;

            case 10:
              _context2.next = 12;
              return think.http(request, think.extend({}, request.res));

            case 12:
              http = _context2.sent;

            case 13:
              http.data = data;
              http.socket = socket;
              http.io = this.io;

              http.socketEmit = this.emit;
              http.socketBroadcast = this.broadcast;

              instance = new this.app(http);
              return _context2.abrupt('return', instance.run());

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function message(_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return message;
  }();

  return _class;
}(_base2.default);

exports.default = _class;