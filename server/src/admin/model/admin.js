'use strict';
/**
 * model
 */
export default class extends think.model.base {	
    async getUserinfo(name) {
		 return await this.model(`admin`).where({name:name}).select();
	}
}