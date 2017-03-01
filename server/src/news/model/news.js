'use strict';
/**
 * model
 */
export default class extends think.model.base {
	async fetchNews(where){
		return await this.model(`news`).where(where).select();
	}
}