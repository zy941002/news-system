import Vue from 'vue'
import Vuex from 'vuex'
import categoty from './category.js'
import news from './news.js'
Vue.use(Vuex)

export default new Vuex.Store({
    strict: true, //使用严格模式
    modules: {
        categoty,
        news
    },
})