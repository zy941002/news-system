'use strict';

import Base from '../../common/base/base.js';
var fs = require('fs');
var path = require('path');
let moment = require('moment')
let util = require('util')

export default class extends think.controller.base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    this.setCorsHeader()
    let data = await this.model(`user`).select();
    return this.success(data)
  }
  async fetchuserAction(){
    this.setCorsHeader();
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
      this.setCorsHeader()
      this.end();
    }
    else{  
      let model = this.model(`user`);
      let params = this.post();
      let id = this.post(`id`);
      let file = JSON.stringify(this.post(`file`));
      let user = this.model(`user`);
      let now =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      this.setCorsHeader();
      if(!think.isEmpty(id)){
        let affectedRows = await user.where({id:id}).update(Object.assign(params,{file:file},{createTime:now}));
        return this.success(affectedRows);
      }
      else{
        let affectedRows = await user.add(Object.assign(params,{file:file},{createTime:now}));
        return this.success(affectedRows);
      }
    }
  }
  async removeAction(){
    let id = this.get(`id`);
    let model= this.model(`user`)
    let res = await model.parseSql(sql,id,id,id);
    console.log(res);
    // let del = await model.execute(res)
    // console.log(del);  
    
  }


  setCorsHeader(){
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with,Content-Type");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  }
}
