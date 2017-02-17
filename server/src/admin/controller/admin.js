'use strict';
/**
 * rest controller
 * @type {Class}
 * @author inkzhou@gmail.com
 */
import Rest from '../../common/rest/rest.js'
export default class extends Rest {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  init(http){
    super.init(http);
  }
  /**
   * before magic method
   * @return {Promise} []
   */
  async __before(){
    if(this.isPost()) {
      let name =  this.post(`name`);
      let password = this.post(`password`);
      if(think.isEmpty(password)){
        console.log("password"+password+name)
        return this.fail(-1,`密码不允许为空`);
      }
      let user =await this.model(`admin`).where({name:name}).select();
      if(!think.isEmpty(user)){
        return this.fail(-2,"用户名被已被抢占,重新注册一个吧")
      }
    }
  }
}