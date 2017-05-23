'use strict';
import Base from '../../common/base/base.js'

export default class extends Base{
  async getrecordAction(){
    let record = this.model(`record`);
    let data = await record.limit(7).select();
    return this.success(data)
  }
}