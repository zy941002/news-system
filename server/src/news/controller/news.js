'use strict'; 
let moment = require('moment')
import Base from '../../common/base/base.js'
export default class extends Base{
  async findlistsAction(){
    let news = await this.model(`user`).join({
      news:{
        join:"right",
        on:["id","author_id"],
      }
    }).page(this.page, 10)
    .countSelect();
    return this.success(news)
  }
  async findAction(){
    let news = await this.model(`news`).where({"news.id":this.id}).join({
        user:{
          on:["author_id","id"]
        }
    }).fieldReverse("password,id").find();
    let categoryInstance = this.controller('category', 'category');
    news[`categories`] = await this.action(categoryInstance,'find');
    return this.success(news)
  }

  // 删除新闻
  async removeAction(){
    let model = this.model(`news`);
    let id = this.get(`id`);
    let affectedRows = await model.where({id:id}).delete()
    return this.success(affectedRows);
  }
  async addnewsAction(){
    let model = this.model(`news`);    
    let news =  this.post();
    // let now =  moment.utc(new Date()).format("YYYY-MM-DD");
    let {id,title,content,pass,top,imageurl,preview,user,categories} = news;
    if(!think.isEmpty(id)){
      let affectedRows = await model.where({id:id}).update({
        title: title,
        content: content,
        pass : Number(pass),
        top : Number(top),
        imageurl: imageurl,
        preview: preview
      });
      return this.success(`更新新闻成功`)

    }else{
        try{
           let res = await model.add({
            title: title,
            create_time: this.now,
            content: content,
            pass : Number(pass),
            top : Number(top),
            author_id:user.id,
            imageurl: imageurl,
            preview: preview
            });
            let promise = []; 
        news.categories.forEach(async(item,index)=>{
          await promise.push(this.model(`news_cate`).add({news_id:res,cate_id:item.id}));
        })
        Promise.all(promise);
        return this.success(`添加新闻成功`)
        }catch(err){
            console.log(err)
            return this.fail(err)
        } 
      }
  }
  async topAction(){  
    let news = this.model(`news`);
    let datime = moment.utc(this.get(`date`)).format(`YYYY-MM-DD`)
    let res = await news.where({create_time:datime,top:1}).select();
        return this.success(res)
  }
  async untopAction(){
    let news = this.model(`news`),
        datime = moment.utc(this.get(`date`)).format(`YYYY-MM-DD`),
        res = await news.where({create_time:datime,top:["!=",1]}).select(); 
    return this.success(res)
  }
  async updateclickAction() {
    let { id , clicked } = this.post()
    let res = await this.model(`news`).where({id:id}).update({clicked:clicked})
    return this.success(res)
  }
  async categorylistAction(){
    let news = this.model(`news`),
        cate = this.model(`category`),
        where = {},
        create_time = moment(this.get(`create_time`)||new Date()).format(`YYYY-MM-DD`);
        if(this.id){
          where = {
            create_time: create_time,
            "cate_id" : this.id
          }
        }else{
          where = {
            create_time: create_time,
          }
        }
    let res = await this.model(`news_cate`).join({
      news:{
        on:["news_id","news.id"],
      },
      category:{
        on:["cate_id","category.id"],
      }
    }).where(where).select();
    return this.json(res)
  }
}