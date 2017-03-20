'use strict';

var fs = require('fs');
var path = require('path');
let moment = require('moment')
let util = require('util')
import Base from './base.js';

export default class extends Base{
  async indexAction() {
    this.setCorsHeader()
    let data = await this.model(`user`).select();
    return this.success(data)
  }
  async fetchuserAction(){
    this.setCorsHeader();
    let where = this.get();
    let data = await this.model(`user`).fetchuser(where);
    return this.json({data:data})
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
  async removeAction(){
    this.setCorsHeader();
    let {id} = this.get();
    let model= this.model(`user`);
    let affectedRows = await model.where({id:id}).delete()
    return this.success(affectedRows);
  }
  setCorsHeader(){
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with,Content-Type");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  }
}