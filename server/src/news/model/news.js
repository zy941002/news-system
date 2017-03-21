'use strict';
/**
 * model
 */
export default class extends think.model.base {
	async fetchNews(where){
		let {pageNum,id} = where;
		let option = {}
		if(id){
			option = {
				id: id
			}
		}
		let data = await this.model(`news`).page([pageNum, 10]).where(option).countSelect();
		return data;
	}
}