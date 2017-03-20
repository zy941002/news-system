'use strict';
/**
 * model
 */
export default class extends think.model.base {
	async fetchNews(where){
		let {pageNum} = where;
		let data = await this.model(`news`).page([pageNum, 10]).countSelect();
		return data;
	}
}