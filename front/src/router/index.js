import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/common/NotFound.vue'
import Admin from '../components/admin/index.vue'
import Init from '../components/common/Init.vue'
import Login from '../components/admin/Login.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/init',
      component: Init
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'manage',
          name: 'manage',
          component: resolve => require(['../components/admin/Manage.vue'], resolve)
        },
        {
          path: 'userdetail',
          name: 'userdetail',   
          component: resolve => require(['../components/user/Userdetail.vue'], resolve)
        },
        {
          path: 'userlist',
          name: 'userlist',   
          component: resolve => require(['../components/user/Userlist.vue'], resolve)
        },
        {
          path: 'newslist',
          name: 'newslist',   
          component: resolve => require(['../components/news/Newslist.vue'], resolve)
        },
        {
          path: 'category',
          name: 'category',   
          component: resolve => require(['../components/news/Category.vue'], resolve)
        },
        {
          path: 'setting',
          name: 'setting',   
          component: resolve => require(['../components/system/Setting.vue'], resolve)
        },
        {
          path: 'newsdetail',
          name: 'newsdetail',
          component: resolve => require(['../components/news/Newsdetail.vue'], resolve)
        },
        {
          path: '*',
          name: 'userlist',   
          component: resolve => require(['../components/user/Userlist.vue'], resolve)
        },
      ]
    },
    {
      path: "*",
      component: NotFound
    },
  ]
})

// component: resolve => require(['../pages/login/'], resolve)