import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/common/NotFound.vue'
import Admin from '../components/admin/index.vue'
import Init from '../components/common/Init.vue'
import Login from '../components/admin/Login.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/init',
      component: Init
    },
    {
      path: '/index',
      component: resolve => require(['../components/index/Index.vue'],resolve),
      children: [
        {
          path: 'category',
          component: resolve => require(['../components/index/Category.vue'],resolve),
        },
        {
          path: 'newsdetail',
          component: resolve=>require(['../components/index/Newsdetail.vue'],resolve),
        }
      ]
    },    
    {
      path: "/login",
      component: Login
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'userdetail',
          name: 'userdetail',   
          component: resolve => require(['../components/user/Userdetail.vue'], resolve),
          meta: { requiresAuth: true }
        },
        {
          path: 'userlist',
          name: 'userlist',   
          component: resolve => require(['../components/user/Userlist.vue'], resolve),
          meta: { requiresAuth: true }
        },
        {
          path: 'newslist',
          name: 'newslist',   
          component: resolve => require(['../components/news/Newslist.vue'], resolve),
          meta: { requiresAuth: true }
        },
        {
          path:'newspanle',
          name: 'newspanle',   
          component: resolve => require(['../components/news/Newspanle.vue'], resolve),
          meta: { requiresAuth: true }

        },
        {
          path: 'category',
          name: 'category',   
          component: resolve => require(['../components/news/Category.vue'], resolve),
          meta: { requiresAuth: true }
        },
        {
          path: 'setting',
          name: 'setting',   
          component: resolve => require(['../components/system/Setting.vue'], resolve),
           meta: { requiresAuth: true }
        },
        {
          path: 'newsdetail',
          name: 'newsdetail',
          component: resolve => require(['../components/news/Newsdetail.vue'], resolve),
          meta: { requiresAuth: true }
        },
        {
          path:'analysis',
          name:'analysis',
          component: resolve => require(['../components/analysis/Analysis.vue'], resolve),
           meta: { requiresAuth: true }
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