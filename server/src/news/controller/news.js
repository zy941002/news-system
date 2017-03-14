'use strict'; 
let moment = require('moment')
export default class extends think.controller.base {
  async fetchAction(){
  	this.setCorsHeader();
    let where = this.get();
  	let news = await this.model(`news`).fetchNews(where);
    let __this = this;
    let promise = [];
    
    news.forEach(async (item,index)=>{          
      promise.push(new Promise(async (resolve,reject)=>{    
        let link = await __this.model(`news_cate`).where({news_id:item.id}).select();
        link.forEach(async (item,index)=>{
          let cate = "cate";          
          let data = await __this.model(`category`).where({id:item.cate_id}).select()          
              link[index][cate] = data[0]; 
        })
        let user =await __this.model(`user`).where({id:item.author_id}).select();
        let res = {
          cate:link,
          user: user[0]
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
  }

  // 新增分类
  async addCateAction(){
    this.setCorsHeader();
    let where = this.post();
    console.log(where);
  }

  // 删除新闻
  async removeAction(){
    this.setCorsHeader();
    let model = this.model(`news`);
    let id = this.get(`id`);
    let affectedRows = await model.where({id:id}).delete()
    return this.success(affectedRows);
  }
  async addnewsAction(){
    this.setCorsHeader();
    let model = this.model(`news`);    
    let where =  this.post();
    let now =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let {id,title,content,pass,extra} =where;
    let cate = this.model(`news_cate`);
    

    if(!think.isEmpty(id)){
      console.log(`更行id`)
      extra.cate.forEach(async (item,index)=>{
        let affectedRows = await cate.add({news_id:id,cate_id:item.cate.id})
      })

      let affectedRows = await model.where({id:id,}).update({title:title,timeflag:now,content: content,pass : Number(pass)});

    }else{

        let resid = await model.add({title:title,timeflag:now,content: content,pass : parseInt(pass),author_id:extra.user.id})  
        extra.cate.forEach(async (item,index)=>{

          let affectedRows = await cate.add({news_id:resid,cate_id:item.cate.id})
        })
    }

    return this.success('addnews')

  }
  async categorylistAction(){
    this.setCorsHeader();
    let {id} = this.get();
    let news = this.model(`news`);
    let cate = this.model(`category`);
    let cates = [];
    let where = {}
    if(id){
      where = {
        cate_id:id
      }
    }
    cates = await this.model(`news_cate`).where(where).select();  
    console.log(cates)
    

    let promise = [];    
    cates.forEach((item,index)=>{
      promise.push(new Promise(async (resolve,reject)=>{
        let cateitem = await cate.where({id:item.cate_id}).select();
        let newsitem = await news.where({id:item.news_id}).select();
        let res = {
          cate : cateitem[0],
          news: newsitem[0]
        }
        resolve(res)
      }))    
    })

    let data =await Promise.all(promise);    
    return this.success(data)
  }
  setCorsHeader(){
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with,Content-Type");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  }
}