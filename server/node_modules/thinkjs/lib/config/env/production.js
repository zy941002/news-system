'use strict';
/**
 * configs in production enviroment
 */

exports.__esModule = true;
var configs = {
  view: {
    adapter: {
      jade: {
        cache_compile: true
      }
    }
  }
};

if (think.cli) {
  configs = think.extend(configs, {
    gc: {
      on: false
    },
    auto_reload: false,
    process_timeout: 0
  });
}

exports.default = configs;