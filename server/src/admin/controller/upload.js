'use strict';

import Base from '../../common/base/base.js';
var fs = require('fs');
var path = require('path');

export default class extends Base {
	async indexAction(){
	   	if(!think.isEmpty(this.file('image'))){
		   	var file =  think.extend({}, this.file('image'));	
			var filepath = file.path;
			var uploadPath = think.RESOURCE_PATH + '/static';
			think.mkdir(uploadPath);
			var basename = path.basename(filepath);
			let fileInfo = Object.assign(file,{url:"http://localhost:8360/static/"+basename})
			fs.renameSync(filepath, uploadPath + '/' + basename);
			file.path = uploadPath + '/' + basename;
			if(think.isFile(file.path)){
				let pics = this.model(`file`)
				let affectedRows = await pics.add(fileInfo)
		      return this.json(fileInfo)
		    }else{
		      console.log('not exist')
		    }
   		}	           	
    	return this.fail("参数错误");
  	}
}