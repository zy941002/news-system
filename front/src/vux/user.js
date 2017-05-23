export const SET_USER = `SET_USER`
export const GET_USER = `GET_USER`
import API from '../api/api.js'    
export default{
    state:{
        user:{
            name:'',
            nickname:'',
            password:'',
            email:'',
            type:'',
        },
    },
    mutations:{
        [SET_USER](state,user){
            state.user = user;
        },
    },
    getters:{
    	[GET_USER](state){
    		return state.user
    	},
    },
    actions:{
	    async [SET_USER]({ state, commit, rootState },param){
	    	await API.FIND(`admin/user/fetchuser`,param).then(res => {
				commit('SET_USER',res.data.data[0]);
			},err=>{
				console.log(res)
			})
	    },
	    [GET_USER](state,user){
	    	return state.user
	    }
    }
}