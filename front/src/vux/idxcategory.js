export const SET_IDXCATEGORY = `SET_IDXCATEGORY`
export const GET_IDXCATEGORY = `GET_IDXCATEGORY`
import API from '../api/api.js'    
export default {
    state:{
        idxcategory:{},
   
    },
    mutations: {
        [SET_IDXCATEGORY](state,idxcategory) {
            state.idxcategory = idxcategory;
        },
    },
    getters:{
    	[GET_IDXCATEGORY](state) {
    		return state.idxcategory
    	},    	
    },
    actions:{
	    async [SET_IDXCATEGORY]({ state, commit, rootState },params){
	    	await API.FIND(`news/news/categorylist`,params).then(res => {
				commit('SET_IDXCATEGORY',res.data)
			},err=>{
				console.log(res)
			})
	    },
	    [GET_IDXCATEGORY](state,category){
	    	return state.idxcategory
	    }
    }
}