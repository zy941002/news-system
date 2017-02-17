// +----------------------------------------------------------------------
// | NEWS [ 新闻网站管理系统 ]
// +----------------------------------------------------------------------
// | Copyright (c) inkzhou@gmail.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: zhouying <inkzhou@gmail.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    await this.session('');
    return this.success(`退出登录`);
  }
}