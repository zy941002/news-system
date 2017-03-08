'use strict';
/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.base {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  async indexAction(){
    this.setCorsHeader();
    let __this = this;
    let affect = await this.model(`news_cate`).select();
    
    
    affect.forEach(async (item,index)=>{
      let news = await  __this.model(`news`).where({id:news_id}).select();
        console.log(news)
    })
    return this.success()


  }
  /**
   * before magic method
   * @return {Promise} []
   */
  setCorsHeader(){
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with,Content-Type");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  }
}