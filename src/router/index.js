import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/home/login'
import home from '@/components/home/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
