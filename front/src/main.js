// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './vux/store.js'
import 'element-ui/lib/theme-default/index.css'
import ECharts from 'echarts'
import './assets/less/CV.less'
Vue.use(ElementUI)


if (window.sessionStorage.userInfo) {
	store.commit('SET_USER',JSON.parse(window.sessionStorage.userInfo));
}
//
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user.user.id) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
