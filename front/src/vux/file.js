export const SET_FILE = 'SET_FILE'
export const GET_FILE = 'GET_FILE'
import API from '../api/api.js'    
export default{
    state:{
        file:"",
    },
    mutations:{
        [SET_FILE](state,file){            
            state.file=file
        }
    },
    getters:{
        [GET_FILE](state){
            return state.file
        }
    },
    actions:{
        [SET_FILE]({state,commit},file){            
            commit('SET_FILE',file)
        }
    }
}