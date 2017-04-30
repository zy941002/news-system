'use strict';
/**
 * model
 */
export default class extends think.model.base {
	async fetchNews(where){
		let {pageNum,id,author_id} = where;
		let option = {}
		if(id){
			option = think.extend({},{id:id})	
		}
		if(author_id){
			option = think.extend(option,{author_id:author_id})
		}
		let data = await this.model(`news`).page([pageNum, 10]).where(option).countSelect();
		return data;
	}
}