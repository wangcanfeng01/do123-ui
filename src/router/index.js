import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/home/login'
import home from '@/components/home/home'
import register from '@/components/home/register'
import video from '@/components/video/video'
import blog from '@/components/blog/blog'
import about from '@/components/about/about'
import admin from '@/components/admin/admin'
import adminCenter from '@/components/admin/admin_center'
import adminOpsLog from '@/components/admin/admin_ops_log'
import adminSysLog from '@/components/admin/admin_sys_log'
import adminComment from '@/components/admin/admin_comment'
import userInfo from '@/components/admin/admin_user'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [{
        path: '/',
        redirect: '/admin/center'
      }, {
        path: '/admin/center',
        name: 'adminCenter',
        component: adminCenter
      }, {
        path: '/admin/opsLog',
        name: 'opsLog',
        component: adminOpsLog
      }, {
        path: '/admin/comment',
        name: 'adminComment',
        component: adminComment
      }, {
        path: '/admin/sysLog',
        name: 'sysLog',
        component: adminSysLog
      }, {
        path: '/admin/user',
        name: 'userInfo',
        component: userInfo
      }
      ]
    }
  ]
})
