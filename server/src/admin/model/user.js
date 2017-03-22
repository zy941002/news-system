'use strict';
/**
 * model
 */
// export default class extends think.model.base {
// 	async fetchuser(where){
// 		let data = await this.model('user').where(where).select();
// 		return data;
// 	}
// }

'use strict';
/**
 * model
 */
export default class extends think.model.base {
	async fetchUser(where){
		let {pageNum,id} = where;
		let option = {}
		if(id){
			option = {
				id: id
			}
		}
		let data = await this.model(`user`).page([pageNum, 10]).where(option).countSelect();
		return data;
	}
}