import Vue from 'vue'
import Vuex from 'vuex'
import category from './category.js'
import news from './news.js'
import user from './user.js'
import file from './file.js'
import idxCategory from './idxcategory.js'
Vue.use(Vuex)

export default new Vuex.Store({
    // strict: true, //使用严格模式
    modules: {
    	idxCategory,
        category,
        news,
        user,
        file
    },
})