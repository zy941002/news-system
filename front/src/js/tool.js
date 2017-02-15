/**
 * 业务代码
 */
export const getType=(type)=>{
	switch(type) {
	    case 0:
	        return '普通用户';
	        break;
	    case 1:
	        return '作者';
	        break;
        case 2:
        	return '管理员';
        	break;
        default:
        	return '';
	}
}