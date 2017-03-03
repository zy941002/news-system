'use strict';
export default class extends think.controller.base {
  async fetchAction(){
  	this.setCorsHeader();
    let where = this.get()
    console.log(news)
  	let news = await this.model(`news`).fetchNews(where);
    let __this = this;
    let promise = [];


    news.forEach((item,index)=>{
      promise.push(new Promise(async (resolve,reject)=>{    
        let link = await __this.model(`news_cate`).where({news_id:item.id}).select(); 
        
        // 查询到所有分类
        link.forEach(async (item,index)=>{
          let cate = "cate";
          let data = await __this.model(`category`).where({id:item.cate_id}).select()
            link[index][cate] = data[0]; 
        })

        // unlink.forEach(async(item,index)=>{
        //   let uncate = 'uncate';
        //   let data = await __this.model(`category`).where({id:item.cate_id}).select();
        //     unlink[index][uncate] = data[0]
        // })        
        let user =await __this.model(`user`).where({id:item.author_id}).select();
        let res = {
          cate:link,
          uncate: unlink,
          user: user
        }
        resolve(res)
      }))
    });
    let results = await Promise.all(promise);
    news.map((item,index)=>{
      let extra = 'extra';
      return item[extra] = results[index]
    })
  	return this.success(news);
  }
  // 删除分类
  async delcateAction(){
    this.setCorsHeader();
    let where = this.get();
    let affectedRows = await this.model(`news_cate`).where(where).delete();
    console.log(affectedRows)

  }
  // 获取分类：包括已选分类和未选分类
  // async getcateAction(){
  //   this.setCorsHeader();
  //   let where = this.get();
  //   let user = {};
  //   let {id} = where;
  //   if(id){
  //     user.id = id
  //   }
  //   let data = await this.model(`category`).select();
  //   return this.success(data)
  // }

  // 删除新闻
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