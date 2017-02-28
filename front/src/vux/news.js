export const SET_NEWS = `SET_NEWS`
export const GET_NEWS = `GET_NEWS`
import API from '../api/api.js'    
export default {
    state:{
        news:null,
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
        let id = ''
        if(parmas){
             id = parmas.dataid
        }        
    	await API.FIND(`news/news`,{
            id : id
        }).
        then(res => {
            console.log(res)
    		commit('SET_NEWS',res.data.data);
            },
            err=>{console.log(res)})
        },
	[GET_NEWS](state,news){
	    return state.news
	    }
    }
}