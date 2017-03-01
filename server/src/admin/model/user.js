'use strict';
/**
 * model
 */
export default class extends think.model.base {
	async fetchuser(where){
		let data = await this.model('user').where(where).select();
		return data;
	}
}