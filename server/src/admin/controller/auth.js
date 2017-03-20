
'use strict';

var fs = require('fs');
var path = require('path');
let moment = require('moment')
let util = require('util')
import Base from './base.js';

export default class extends think.controller.base{
  async loginAction() {  
      this.setCorsHeader();
      let where = this.post();      
      let data =await this.model(`user`).where(where).select();
      if(think.isEmpty(data)){
        return this.fail({errorno:-1},"用户名或密码错误")  
      }
      else{
        this.user = data;
        await this.session('userinfo',data);
        console.log(await this.session(`userinfo`))
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
      let params = this.post();
      let {id}= params;
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
  setCorsHeader(){
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with,Content-Type");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  }
}