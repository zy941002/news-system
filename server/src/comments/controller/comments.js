'use strict';

import Base from '../../common/base/base.js';

export default class extends  Base{
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  async addAction() { 
  	let  {userid, newsid , content} = this.post();
  	let comments = this.model(`comments`);
  	try{
  		let data =  await comments.add({
  			userid : userid,
  			newsid : newsid,
  			content : content
  		})
  		return this.success(data)
  	}catch(err){
  		console.log(err)
  	}
  	
  } 
}