/**
 * 业务代码
 */
export const TYPE = 'type'
export const getType=(data)=>{
	for (var i = 0; i < data.length; i++) {
		switch(data[i][TYPE]) {
		    case 0:
		        data[i][TYPE]=="普通用户";
		        break;
		    case 1:
		        data[i][TYPE]== '作者';
		        break;
	        case 2:
	        	data[i][TYPE]== '管理员';
	        	break;
	        default:
	        	data[i][TYPE]== '普通用户'
		}
	}
}