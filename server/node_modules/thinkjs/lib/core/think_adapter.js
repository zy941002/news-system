'use strict';

exports.__esModule = true;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * create, register, call adapter
 * @param  {String} name []
 * @return {void}      []
 */
var Adapter = function Adapter() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var type = args[0],
      name = args[1],
      fn = args[2];

  var length = args.length,
      key = 'adapter_';
  if (length === 3) {
    //register adapter
    //think.adapter('session', 'redis', function(){})
    if (think.isFunction(fn)) {
      key += type + '_' + name;
      thinkData.export[key] = fn;
      return;
    }
    //create adapter
    //module.exports = think.adapter('session', 'memory', {})
    else if (think.isObject(fn)) {
        return think.Class(think.adapter(type, name), fn);
      }
  }
  //type has not _
  else if (length === 2 && think.isString(type) && type.indexOf('_') === -1) {
      //create adapter
      //module.exports = think.adapter('session', {})
      if (think.isObject(name)) {
        return think.Class(think.adapter(type, 'base'), name);
      }
      //get adapter
      //think.adapter('session', 'redis')
      else if (think.isString(name)) {
          return Adapter.get(type, name);
        }
    }

  return Adapter.create(type, name);
};

//get adapter
//think.adapter('session', 'redis')
Adapter.get = function (type, name) {
  var key = 'adapter_';
  var nameLower = name.toLowerCase();
  if (name !== nameLower) {
    name = nameLower;
    think.log(function (colors) {
      return colors.yellow('[WARNING]') + (' adapter type `' + name + '` has uppercase chars.');
    });
  }

  key += type + '_' + name;
  var cls = think.require(key, true);
  if (cls) {
    return cls;
  } else {
    Adapter.load(type, name);
    var _cls = think.require(key, true);
    if (_cls) {
      return _cls;
    }
  }
  throw new Error(think.locale('ADAPTER_NOT_FOUND', key));
};

//create adapter
//module.exports = think.adapter({})
//module.exports = think.adapter(function(){}, {});
Adapter.create = function (type, name) {
  var superClass = void 0;
  if (think.isFunction(type)) {
    superClass = type;
  } else if (think.isString(type)) {
    superClass = think.require(type);
  }
  //create clean Class
  if (!superClass) {
    return think.Class(type);
  }
  return think.Class(superClass, name);
};

/**
 * load system & comon module adapter
 * @return {} []
 */
Adapter.load = function (type) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'base';

  var paths = ['' + think.THINK_LIB_PATH + think.sep + 'adapter'];

  //load base adapter
  if (!think.adapter.base) {
    think.adapter.base = think.safeRequire(paths[0] + '/base.js');
  }

  //common module adapter
  var adapterPath = think.getPath(undefined, think.dirname.adapter);
  if (think.isDir(adapterPath)) {
    paths.push(adapterPath);
  }
  paths.forEach(function (path) {
    if (type) {
      var filepath = '' + path + think.sep + type + think.sep + name + '.js';
      if (think.isFile(filepath)) {
        thinkData.alias['adapter_' + type + '_' + name] = filepath;
      }
    } else {
      var dirs = _fs2.default.readdirSync(path);
      dirs.forEach(function (dir) {
        if (!think.isDir(path + '/' + dir)) {
          return;
        }
        think.alias('adapter_' + dir, '' + path + think.sep + dir);
      });
    }
  });
};

exports.default = Adapter;