'use strict'; 
let moment = require('moment')
export default class extends think.controller.base {
  async fetchAction(){
  	this.setCorsHeader();
    let where = this.get();
  	let news = await this.model(`news`).fetchNews(where);
    let __this = this;
    let promise = [];
    
    news.data.forEach(async (item,index)=>{          
      
      promise.push(new Promise(async (resolve,reject)=>{            
        // 查找评论
        let cmt = await __this.model(`comments`).where({newsid:item.id}).select();

        cmt.forEach(async (item,index)=>{
          let user = `user`
          let cmtuser = await __this.model(`user`).where({id:item.userid}).select();
              cmt[index][user] = cmtuser[0];                 
        })

        //查找分类    
        let link = await __this.model(`news_cate`).where({news_id:item.id}).select()
        link.forEach(async (item,index)=>{
          let cate = "cate";     
          let data = await __this.model(`category`).where({id:item.cate_id}).select()          
              link[index][cate] = data[0]; 
        })

        
        // 查找作者
        let user =await __this.model(`user`).where({id:item.author_id}).select(); 
        

        let res = {
          cate:link,
          user: user[0],
          comment: cmt
        }
        resolve(res)
      }))
    });    
    
    let results = await Promise.all(promise);


    news.data.map((item,index)=>{
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
    let now =  moment.utc(new Date()).format("YYYY-MM-DD");
    let {id,title,content,pass,extra,top} = where;
    let cate = this.model(`news_cate`);
    if(!think.isEmpty(id)){
      extra.cate.forEach(async (item,index)=>{
        let affectedRows = await cate.thenAdd({news_id:id,cate_id:item.cate.id},{news_id:id,cate_id:item.cate.id})
      })
      let affectedRows = await model.where({id:id,}).update({
        title: title,
        timeflag: now,
        content: content,
        pass : Number(pass),
        top : Number(top),
      });
      return this.success(`更新新闻成功`)

    }else{
        try{
           await model.add({title:title,timeflag:now,content: content,pass : parseInt(pass),author_id:extra.user.id});
            extra.cate.forEach(async (item,index)=>{
              let affectedRows = await cate.add({news_id:resid,cate_id:item.cate.id})
            }) 
           return this.success(`添加新闻成功`)
        }catch(err){
            return this.fail(err)
        } 
      }
  }
  async topAction(){
    this.setCorsHeader();
    let news = this.model(`news`);
    // console.log(moment(new Date()).format("YYYY-MM-DD")+"----moment---server now--------");
    // console.log(new Date()+"Date-----------------NOW-----------")
    let datime = moment.utc(this.get(`date`)).format(`YYYY-MM-DD`)
    // console.log(datime+"-----------------"+this.get(`date`))
    let res = await news.where({timeflag:datime,top:1}).select();
        return this.success(res)
  }
  async categorylistAction(){
    this.setCorsHeader();
    let {id} = this.get(),
        news = this.model(`news`),
        cate = this.model(`category`),
        cates = [],promise = [],where = {}
    if(id){
      where = {
        cate_id:id
      }
    }
    cates = await this.model(`news_cate`).where(where).select();  
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