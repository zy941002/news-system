'use strict';

import Base from '../../common/base/base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  testAction() {
    return this.success("hometest")
  }
}