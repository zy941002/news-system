
// +----------------------------------------------------------------------
// | NEWS [ 新闻网站管理系统 ]
// +----------------------------------------------------------------------
// | Copyright (c) inkzhou@gmail.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: zhouying <inkzhou@gmail.com>
// +----------------------------------------------------------------------
'use strict';
let moment = require('moment')
export default class extends think.controller.base {
  init(http) {
    super.init(http);
  }
  async __before(){
    let method = this.http.method.toLowerCase();
    if(method === 'options'){
      this.setCorsHeader();
      this.end();
    }
    this.setCorsHeader();
    this.id = this.get(`id`)
    this.page = this.get(`page`)
    this.now =  moment.utc(new Date()).format("YYYY-MM-DD");
    return;
  }  
  //-----end of before
  setCorsHeader(){
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with,Content-Type");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  }
}
