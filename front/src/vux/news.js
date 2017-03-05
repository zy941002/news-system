export const SET_NEWS = `SET_NEWS`
export const GET_NEWS = `GET_NEWS`
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
    },
    mutations: {
        [SET_NEWS](state,news) {
            state.news = news;
        }
    },
    getters:{
    	[GET_NEWS](state) {
    		return state.news
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