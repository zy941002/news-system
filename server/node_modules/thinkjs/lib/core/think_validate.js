'use strict';

exports.__esModule = true;

var _validator = require('../util/validator.js');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * validate data
 * {
 *   name: {
 *     value: 'test',
 *     required: true,
 *     length: [4, 20],
 *     email: true
 *   },
 *   pwd: {
 *     value: '12345678',
 *     required: true,
 *     length: [6, 20]
 *   }
 *   confirm_pwd: {
 *     value: '12345678',
 *     required: true,
 *     equals: 'pwd'
 *   }
 * }
 * @param  {String | Object}   name     []
 * @param  {Function} callback []
 * @return {}            []
 */

//get error message
var _getValidateErrorMsg = function _getValidateErrorMsg(type, name, value, args, msgs) {
  var key = 'validate_' + type;
  var keyWithName = key + '_' + name;
  var msg = msgs[keyWithName];
  if (!msg && think.locale(keyWithName) !== keyWithName) {
    msg = think.locale(keyWithName);
  }
  msg = msg || msgs[key];
  if (!msg && think.locale(key) !== key) {
    msg = think.locale(key);
  }
  msg = msg || think.locale('PARAMS_NOT_VALID');
  return msg.replace('{name}', name).replace('{value}', value).replace('{args}', args.join(','));
};

var _getValidateRuleFnAndArgs = function _getValidateRuleFnAndArgs(type, args, rules) {
  var fn = _validator2.default[type];
  if (!think.isFunction(fn)) {
    throw new Error(think.locale('CONFIG_NOT_FUNCTION', type + ' type'));
  }
  if (think.isBoolean(args)) {
    args = [];
  } else if (!think.isArray(args)) {
    args = [args];
  }
  var parseArgs = _validator2.default['_' + type];
  //parse args
  if (think.isFunction(parseArgs)) {
    args = parseArgs(args, rules);
  }
  return { fn: fn, args: args };
};

/**
 * get all rule values, for default function to get value
 * @param  {Object} rules []
 * @return {Object}       []
 */
var _getRuleValues = function _getRuleValues(rules) {
  var ret = {};
  for (var name in rules) {
    ret[name] = rules[name].value;
  }
  return ret;
};

/**
 * to boolean
 * @param  {Mixed} value []
 * @return {Boolean}       []
 */
var _toBoolean = function _toBoolean(value) {
  return ['yes', 'on', '1', 'true', true].indexOf(value) > -1;
};

/**
 * parse value
 * @param  {Mixed} value []
 * @param  {Object} item  []
 * @return {Mixed}       []
 */
var _parseValue = function _parseValue(value, item) {
  if (item.int || item.type === 'int') {
    return parseInt(value);
  } else if (item.float || item.type === 'float') {
    return parseFloat(value);
  } else if (item.boolean || item.type === 'boolean') {
    return _toBoolean(value);
  }
  return value;
};
/**
 * get item value
 * @param  {Object} item   []
 * @param  {Object} values []
 * @return {Mixed}        []
 */
var _getItemValue = function _getItemValue(item, values, parse) {
  //get item value
  //avoid default is undefined, but check type is string
  var itemValue = item.value;
  //trim value
  if (item.trim && itemValue && itemValue.trim) {
    itemValue = itemValue.trim();
  }
  var _default = item.default;
  if (!itemValue && !think.isTrueEmpty(_default)) {
    itemValue = item.default;
  }
  if (think.isFunction(itemValue)) {
    itemValue = itemValue.call(values);
  }

  //make data to array when type is array
  if (item.value && item.array && !think.isArray(item.value)) {
    if (think.isString(itemValue)) {
      try {
        itemValue = JSON.parse(itemValue);
      } catch (e) {
        itemValue = itemValue.split(/\s*,\s*/);
      }
    } else {
      itemValue = [itemValue];
    }
  }
  //make data to object when type is object
  else if (item.value && item.object && think.isString(itemValue)) {
      try {
        itemValue = JSON.parse(itemValue);
      } catch (e) {}
    } else if (item.boolean) {
      itemValue = _toBoolean(itemValue);
    }

  //parse value
  if (parse) {
    if (item.array) {
      itemValue = itemValue.map(function (it) {
        return _parseValue(it, item);
      });
    } else {
      itemValue = _parseValue(itemValue, item);
    }
  }

  return itemValue;
};

var Validate = function Validate(name, callback) {
  // register validate callback
  if (think.isString(name)) {
    // think.validate('test', function(){})
    if (think.isFunction(callback)) {
      _validator2.default[name] = callback;
      return;
    }
    // get validator callback
    return _validator2.default[name];
  }
  return Validate.exec(name, callback);
};

/**
 * exec validate
 * @param  {Object} rules []
 * @param  {Object} msgs  []
 * @return {Object}       []
 */
Validate.exec = function (rules) {
  var msgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var ret = {};
  var values = _getRuleValues(rules);

  var _loop = function _loop(name) {
    var item = rules[name];
    var itemValue = _getItemValue(item, values);

    var _loop2 = function _loop2(vtype) {
      if (vtype === 'value' || vtype === 'default' || vtype === 'trim') {
        return 'continue';
      }
      //if has array rule, then foreach check value for every rule
      if (item.array && vtype !== 'array' && think.isArray(itemValue)) {
        var flag = itemValue.some(function (ivalue) {
          var _getValidateRuleFnAnd = _getValidateRuleFnAndArgs(vtype, item[vtype], rules),
              fn = _getValidateRuleFnAnd.fn,
              args = _getValidateRuleFnAnd.args;

          var result = fn.apply(undefined, [ivalue].concat(args));
          if (!result) {
            var msg = _getValidateErrorMsg(vtype, name, ivalue, args, msgs);
            ret[name] = msg;
            return true;
          }
        });
        if (flag) {
          return 'break';
        }
      } else {
        var _getValidateRuleFnAnd2 = _getValidateRuleFnAndArgs(vtype, item[vtype], rules),
            fn = _getValidateRuleFnAnd2.fn,
            args = _getValidateRuleFnAnd2.args;

        var result = fn.apply(undefined, [itemValue].concat(args));
        if (!result) {
          var msg = _getValidateErrorMsg(vtype, name, itemValue, args, msgs);
          ret[name] = msg;
          return 'break';
        }
      }
    };

    _loop3: for (var vtype in item) {
      var _ret2 = _loop2(vtype);

      switch (_ret2) {
        case 'continue':
          continue;

        case 'break':
          break _loop3;}
    }
  };

  for (var name in rules) {
    _loop(name);
  }
  return ret;
};

/**
 * get new values for rules
 * @param  {Object} rules []
 * @return {Object}       []
 */
Validate.values = function (rules) {
  var ret = {};
  var values = _getRuleValues(rules);
  for (var name in rules) {
    var _itemValue = _getItemValue(rules[name], values, true);
    ret[name] = _itemValue;
  }
  return ret;
};

/**
 * parse string rule to object
 * @param  {String} rule []
 * @return {Object}      []
 */
Validate.parse = function (rule) {
  var rules = rule.split('|');
  var ret = {};
  rules.forEach(function (item) {
    item = item.trim();
    if (!item) {
      return;
    }
    var pos = item.indexOf(':');
    if (pos > -1) {
      var name = item.substr(0, pos);
      var args = item.substr(pos + 1).trim();
      if (args[0] === '{' || args[0] === '[') {
        var value = new Function('', 'return ' + args)();
        args = name === 'default' ? value : [value];
      } else if (name !== 'default') {
        args = args.split(/\s*,\s*/);
      }
      ret[name] = args;
    } else {
      ret[item] = true;
    }
  });
  return ret;
};

exports.default = Validate;