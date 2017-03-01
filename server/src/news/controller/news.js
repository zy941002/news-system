'use strict';
export default class extends think.controller.base {
  async fetchAction(){
  	this.setCorsHeader();
    let where = this.get()
  	let news = await this.model(`news`).fetchNews(where);
    let __this = this;
    let promise = [];
    news.forEach((item,index)=>{
      promise.push(new Promise((resolve,reject)=>{
        __this.model(`cate`).where({id:item.cate_id}).select();
        resolve(__this.model(`user`).where({id:item.author_id}).select())
      }))
    });
    let results = await Promise.all(promise);
    news.map((item,index)=>{
      let author = 'author';
      return item[author] = results[index][0]
    })
  	return this.success(news);
  }
  async removeAction(){
    this.setCorsHeader();
    let model = this.model(`news`);
    let id = this.get(`id`);
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