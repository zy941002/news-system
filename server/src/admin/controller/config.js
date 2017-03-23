'use strict';

import Rest from '../../common/rest/rest.js'
import Base from '../../common/base/base.js'
export default class extends Base {
	async indexAction(){
		let configs = await this.model(`config`).select()
		return this.success(configs);
	}
	async addconfigAction(){
		let { id,name,url } = this.post();
			if(id) {
				let affectedRows = await this.model(`config`).where({id:id}).update({name:name,url:url});
				return this.success(affectedRows)
			}else {
				let affectedRows = await this.model(`config`).add(this.post())
				return this.success(affectedRows);
			}	
	}
	async deleteAction(){
		let {id} = this.get()
		if(id){
			let affectedRows = await this.model(`config`).where({id:id}).delete();
			return this.success(`删除成功`)
		}
	}
  
}
