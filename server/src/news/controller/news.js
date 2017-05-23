'use strict'; 
let moment = require('moment')
import Base from '../../common/base/base.js'
export default class extends Base{
  async findlistsAction(){
    let author_id = this.get(`author_id`);    
    let where = {}; 
    if(author_id){
      where = {
        author_id: author_id
      }
    }
    let news = await this.model(`user`).join({
      news:{
        join:"right",
        on:["id","author_id"],
      }
    }).
    where(where).
    page(this.page, 10).
    order({"news.create_time": 'DESC'}).
    countSelect();
    return this.success(news)
  }
  async findAction(){
    let news = await this.model(`news`).where({"news.id":this.id}).fieldReverse('password').find();
    let user = await this.model('user').where({id: news.author_id}).find();
    let categoryInstance = this.controller('category', 'category');
    news[`categories`] = await this.action(categoryInstance,'find');
    news[`user`] = user;    
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
  async maxclickAction(){
    let data = await this.model(`news`).where({create_time:this.now}).order('clicked DESC').limit(5).select();
    return this.json(data)
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
  async clickmaxAction(){
    let news = this.model(`news`)
    let clicked =  await news.max(`clicked`);
    let data = await news.join({
          user:{
            on:["author_id","id"]
          }
        }).
        where({clicked:clicked}).
        fieldReverse("id")
        .find();
    return this.json(data)
  }
  async pvAction() {
    let record= this.model(`record`)
    let {date} = this.post()
    let  datepv = await record.where({date:this.now}).find();
    let affectedRows = ""
    console.log(datepv)
    if(datepv.count){
          let count = ++datepv.count;
          affectedRows = await record.where({date: moment(date).format(`YYYY-MM-DD`)}).update({count:count});  
    }else{
        affectedRows = await record.where().add({date: moment(date).format(`YYYY-MM-DD`),count:1});
    } 
  }
}