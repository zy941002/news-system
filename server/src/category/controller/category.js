'use strict';
/**
 * rest controller
 * @type {Class}
 */
import Base from '../../common/base/base.js'
export default class extends Base{
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  async indexAction(){
    // this.setCorsHeader();
    let __this = this;
    let affect = await this.model(`news_cate`).select();
    
    
    affect.forEach(async (item,index)=>{
      let news = await  __this.model(`news`).where({id:news_id}).select();
        console.log(news)
    })
    return this.success()


  }
}