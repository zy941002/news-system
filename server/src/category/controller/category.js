'use strict';
/**
 * rest controller
 * @type {Class}
 */
import Base from '../../common/base/base.js'
export default class extends Base{
  // 新闻的分类管理
  /**
   * 通过新闻ID获取分类
   * @return {[type]} [description]
   */
  async findAction(){
    let  promises = [];
    let res = await this.model(`news_cate`).where({news_id:this.id}).select()
    res.forEach(async(item,index)=>{
       promises.push(new Promise(async (resolve,reject)=>{
          let data = await this.model(`category`).where({id:item.cate_id}).find()
          resolve(data)
       }))
    })
    let categories =await Promise.all(promises);
    return categories;
  } 
  /**
   * 通过新闻ID添加分类
   */
  async addAction(){
    let cate_id = this.get(`cate_id`)||cate_id
    if(this.id){
      let res = await this.model(`news_cate`).add({news_id:this.id,cate_id:cate_id});
      return res;  
    }
    
  }
  /**
   * 通过新闻删除分类
   */
  async deleteAction(){
    let cate_id = this.get(`cate_id`)
    let affectedRows = await this.model(`news_cate`).where({news_id:this.id,cate_id:cate_id}).delete();
    return this.success(affectedRows)
  }
}