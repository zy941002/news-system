'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * configs for post request
 */
exports.default = {
  json_content_type: ['application/json'],
  max_file_size: 1024 * 1024 * 1024, //1G
  max_fields: 100,
  max_fields_size: 2 * 1024 * 1024, //2M,
  single_file_header: 'x-filename',
  file_upload_path: think.RUNTIME_PATH + _path2.default.sep + 'upload',
  file_auto_remove: true,
  log_error: false
};