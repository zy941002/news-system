export const SET_CATEGORY = `SET_CATEGORY`
export const GET_CATEGORY = `GET_CATEGORY`
export const SET_CATEGORIES = `SET_CATEGORIES`
export const GET_CATEGORIES = `GET_CATEGORIES`
import API from '../api/api.js'    
export default {
    state:{
        category:[],
        categories:[]
    },
    mutations: {
        [SET_CATEGORY](state,category) {
            state.category = category;
        },
        [SET_CATEGORY](state,category) {
            state.category = category;
        },
        [SET_CATEGORIES](state,categories) {
            state.categories = categories;
        },
        [SET_CATEGORIES](state,categories) {
            state.categories = categories;
        }
    },
    getters:{
    	[GET_CATEGORY](state) {
    		return state.category
    	},    	
        [GET_CATEGORIES](state) {
            return state.categories
        }
    },
    actions:{
	    async [SET_CATEGORY]({ state, commit, rootState }){
	    	await API.FIND(`news/news/getcate`).then(res => {
				commit('SET_CATEGORY',res.data.data);
			},err=>{
				console.log(res)
			})
	    },
	    [GET_CATEGORY](state,category){
	    	return state.category
	    },
        async [SET_CATEGORIES]({ state, commit, rootState }){
            await API.FIND(`admin/category`).then(res => {
                commit(`SET_CATEGORIES`,res.data.data)
            },err=>{
                console.log(res)
            })
        },
        [GET_CATEGORIES](state,categories){
            return state.categories
        }
    }
}