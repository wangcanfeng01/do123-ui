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
import visitorInfo from '@/components/admin/admin_visitor'
import dbInfo from '@/components/admin/admin_db'
import tasksInfo from '@/components/admin/admin_tasks'
import roleInfo from '@/components/admin/admin_role'
import menuInfo from '@/components/admin/admin_menu'
import adminVideo from '@/components/admin/admin_video'
import adminBlog from '@/components/admin/admin_blog'
import aboutMind from '@/components/about/about_mind'
import blogCenter from '@/components/blog/blog_center'
import blogKeyword from '@/components/blog/blog_keyword'
import blogList from '@/components/blog/blog_list'
import blogManage from '@/components/blog/blog_manage'
import blogWriter from '@/components/blog/blog_writer'
import blogArticle from '@/components/blog/blog_article'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/index.html',
      redirect: '/home'
    }, {
      path: '/login',
      name: 'login',
      meta: {
        noAuth: true
      },
      component: login
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        noAuth: true
      },
      component: home
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        noAuth: true
      },
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
      component: blog,
      children: [{
        path: '/',
        redirect: '/blog/center'
      }, {
        path: '/blog/center',
        name: 'blogCenter',
        component: blogCenter
      }, {
        path: '/blog/keyword',
        name: 'blogKeyword',
        component: blogKeyword
      }, {
        path: '/blog/list',
        name: 'blogList',
        component: blogList
      }, {
        path: '/blog/manage',
        name: 'blogManage',
        component: blogManage
      }, {
        path: '/blog/writer',
        name: 'blogWriter',
        component: blogWriter
      }]
    },
    {
      path: '/blog/article',
      name: 'blogArticle',
      component: blogArticle
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/about/mind',
      name: 'aboutMind',
      component: aboutMind
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
      }, {
        path: '/admin/visitor',
        name: 'visitorInfo',
        component: visitorInfo
      }, {
        path: '/admin/dbInfo',
        name: 'dbInfo',
        component: dbInfo
      }, {
        path: '/admin/tasks',
        name: 'tasksInfo',
        component: tasksInfo
      }, {
        path: '/admin/role',
        name: 'roleInfo',
        component: roleInfo
      }, {
        path: '/admin/menu',
        name: 'menuInfo',
        component: menuInfo
      }, {
        path: '/admin/video',
        name: 'adminVideo',
        component: adminVideo
      }, {
        path: '/admin/blog',
        name: 'adminBlog',
        component: adminBlog
      }
      ]
    }
  ]
})
