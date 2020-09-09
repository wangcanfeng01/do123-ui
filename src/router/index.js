import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'

Vue.use(Router)
// TODO 修改路由信息
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/index.html',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        noAuth: true
      },
      component: home
    }
  ]
})
