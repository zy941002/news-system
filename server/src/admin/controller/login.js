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
  async indexAction(){
    let name = this.get( `name`),
        pwd  = this.get(`password`)
    let res  = await this.model(`admin`).getUserinfo(name);
    if( think.isEmpty(res) ){
      return this.fail(-1,`该用户不是管理员`);
    }
    else if (pwd!== res[0].password){
      return this.fail(-2,`用户名或密码错误`);      
    }
    else {
      await this.session("userInfo",res)
      return this.success(res)  
    }
    
  }
}