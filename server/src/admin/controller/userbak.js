'use strict';

import Base from '../../common/base/base.js';
var fs = require('fs');
var path = require('path');
let moment = require('moment')

export default class extends think.controller.base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
    this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
    this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
    this.header('Access-Control-Allow-Credentials', 'true');
    let data = await this.model(`user`).select();
    return this.success(data)
  }
  async fetchuserAction(){
    this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
    this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
    this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
    this.header('Access-Control-Allow-Credentials', 'true');
    let where = this.get();
    let data =await this.model(`user`).where(where).select();

    return this.json({data:data})
  }
	async loginAction() {  
      let where = this.post();      
		  let data =await this.model(`user`).where(where).select();
      if(think.isEmpty(data)){
        return this.fail({errorno:-1},"用户名或密码错误")  
      }
      else{
        return this.success(data)
      }
	}
  async addAction(){
    let method = this.http.method.toLowerCase();
    if(method === 'options'){
      this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
      this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
      this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
      this.header('Access-Control-Allow-Credentials', 'true');
      this.end();
    }
    else{  
      let model = this.model(`user`);
      let params = this.post();
      let id = this.post(`id`);
      let file = JSON.stringify(this.post(`file`));
      let user = this.model(`user`);
      let now =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
      this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
      this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
      this.header('Access-Control-Allow-Credentials', 'true');
      
      if(!think.isEmpty(id)){
        let affectedRows = await user.where({id:id}).update(Object.assign(params,{file:file},{createTime:now}));
        return this.success(affectedRows);
      }
      else{
        let affectedRows = await user.add(Object.assign(params,{file:file},{createTime:now}));
      }

    }
  }

  //   let model = this.model(`user`);
  //   let params = this.post();
  //   let id = this.post(`id`);
  //   let file = JSON.stringify(this.post(`file`));
  //   let user = this.model(`user`);
  //   let now =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  //   // 更新用户
  //   if(!think.isEmpty(id)){
  //       let affectedRows = await user.where({id:id}).update(Object.assign(params,{file:file},{createTime:now}));
  //       return this.success(affectedRows);
  //   }
  //   //新增用户
  //   else{
  //     let method = this.http.method.toLowerCase();
  //     if(method === 'options'){
  //       this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
  //       this.header('Access-Control-Allow-Headers', 'x-requested-wit,Content-Type');
  //       this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
  //       this.header('Access-Control-Allow-Credentials', 'true');
  //       return;
  //     }
  //     let affectedRows = await user.add(Object.assign(params,{file:file},{createTime:now}));
  //   }
  // }
}
  