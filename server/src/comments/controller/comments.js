'use strict';

import Base from '../../common/base/base.js';
let moment  = require('moment')

export default class extends  Base{
  async addAction() { 
  	let  {userid, newsid , content, username} = this.post();
    let now = moment(new Date()).format(`YYYY-MM-DD`);
  	let comments = this.model(`comments`);
    let type = this.http.method.toLowerCase();
    if(type=="post"){
      try{
        let data =  await comments.add({
          username: username,
          userid : userid,
          newsid : newsid,
          content : content,
          createTime : now
        })      
        return this.success(data)
      }catch(err){
        console.log(err)
      }
    }  	
  } 
  async findAction(){
    let {id,page} = this.get();
    let res = await this.model(`comments`).where({newsid:this.id}).page(page, 10).join({
        user:{
          on:["userid","id"]
        }
    }).countSelect();
    console.log(res)
    return this.success(res)
  }

}