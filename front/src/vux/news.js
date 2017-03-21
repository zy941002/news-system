export const SET_NEWS = `SET_NEWS`
export const GET_NEWS = `GET_NEWS`

export const SET_TOPS = `SET_TOPS`
export const GET_TOPS = `GET_TOPS`

import API from '../api/api.js'    
export default {
    state:{
        news:{
            categories:[],
            title:"",
            pass:false,
            content:"",
            extra:{
                cate:[],
                user:{},
            },
        },
        top:[]
    },
    mutations: {
        [SET_NEWS](state,news) {
            state.news = news;
        },
        [SET_TOPS](state,news){
            state.top = top
        }
    },
    getters:{
    	[GET_NEWS](state) {
    		return state.news
    	},
        [GET_TOPS](state){
            return state.top
        }    	
    },
    actions:{
    	async [SET_NEWS]({commit,state},parmas){
        parmas?parmas:{};        
    	await API.FIND(`news/news/fetch`,parmas).then(
            res => {
                commit('SET_NEWS',res.data.data[0])}
            ,err=>{console.log(res)})
        },
	   [GET_NEWS](state,news){
	        return state.news
	    }
        
    }
}