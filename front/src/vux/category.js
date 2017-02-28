export const SET_CATEGORY = `SET_CATEGORY`
export const GET_CATEGORY = `GET_CATEGORY`
import API from '../api/api.js'    
export default {
    state:{
        category:[]
    },
    mutations: {
        [SET_CATEGORY](state,category) {
            state.category = category;
        }
    },
    getters:{
    	[GET_CATEGORY](state) {
    		return state.category
    	}    	
    },
    actions:{
	    [SET_CATEGORY]({ state, commit, rootState }){
	    	API.FIND(`admin/category`).then(res => {
				commit('SET_CATEGORY',res.data.data);
			},err=>{
				console.log(res)
			})
	    },
	    [GET_CATEGORY](state,category){
	    	return state.category
	    }
    }
}