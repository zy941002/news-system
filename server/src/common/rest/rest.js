// +----------------------------------------------------------------------
// | NEWS [ 新闻网站管理系统 ]
// +----------------------------------------------------------------------
// | Copyright (c) inkzhou@gmail.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: zhouying <inkzhou@gmail.com>
// +----------------------------------------------------------------------
'use strict';
export default class extends think.controller.rest {
  /**
   * index action logic
   * @return {} []
   */
  init(http){
    super.init(http);
    //设置 _method，表示从 GET 参数获取 _method 字段的值
    //如果没有取到，则从 http method 中获取
    this._method = "_method";
  }
  * getAction(){
    let data;
    if (this.id) {
      let pk = yield this.modelInstance.getPk();
      data = yield this.modelInstance.where({[pk]: this.id}).find();
      return this.success(data);
    }
    data = yield this.modelInstance.select();
    return this.success(data);
  }

  * postAction(){
    let pk = yield this.modelInstance.getPk();
    let data = this.post();
    delete data[pk];
    if(think.isEmpty(data)){
      return this.fail("data is empty");
    }
    let insertId = yield this.modelInstance.add(data);
    return this.success({id: insertId});
  }
  * deleteAction(){
    if (!this.id) {
      return this.fail(-1,"params error");
    }
    let pk = yield this.modelInstance.getPk();
    let rows = yield this.modelInstance.where({[pk]: this.id}).delete();
    return this.success({affectedRows: rows});
  }
  * putAction(){
    if (!this.id) {
      return this.fail(-1,  "params error");
    }
    let pk = yield this.modelInstance.getPk();
    let data = this.get();
    console.log(data)
    delete data[pk];
    if (think.isEmpty(data)) {
      return this.fail("data is empty");
    }
    let rows = yield this.modelInstance.where({[pk]: this.id}).update(data);
    return this.success({affectedRows: rows});
  }

  // 找不到方法时调用
  __before(){
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with, Content-Type");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header('Access-Control-Allow-Credentials',true);
    let method = this.http.method.toLowerCase();
    if(method === "options"){
      this.end();
      return;
    }
  }
}