<template xmlns:el-col="http://www.w3.org/1999/html">
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu--horizontal"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b">
      <!--style="margin-top: -8px;margin-left: -8px;margin-right: -8px"-->
      <el-col :span="1" :offset="3">
        <router-link id="logo" to="/home">
          <img src="./assets/home.jpg" style="border-radius: 50%;margin-top: 0.8em">
        </router-link>
      </el-col>
      <el-menu-item index="/home" v-show="loginUser.menuMap.home">主页</el-menu-item>
      <el-menu-item index="/blog/center" v-show="loginUser.menuMap.blog">博客</el-menu-item>
      <el-menu-item index="/video" v-show="loginUser.menuMap.video">视频</el-menu-item>
      <el-menu-item index="/about" v-show="loginUser.menuMap.about">关于本站</el-menu-item>
      <el-menu-item index="/admin/center" v-show="loginUser.menuMap.admin">管理中心</el-menu-item>
      <el-col :span="3" :offset="5">
        <el-input v-model="search" placeholder="请输入查询内容" style="margin-top: 0.8em"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="margin-left:0.3em; margin-top: 0.8em">搜索</el-button>
      </el-col>
      <el-col :span="1">
        <el-dropdown trigger="click" @command="loginCommand" v-show="isLogin==='false'">
          <el-button style="margin-top: 0.8em;" type="success">
            登录<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="login">会员登录</el-dropdown-item>
            <el-dropdown-item command="visitor">游客登录</el-dropdown-item>
            <el-dropdown-item command="register">注册账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" @command="logoutCommand" v-show="isLogin==='true'">
          <el-button style="margin-top: 0.8em;" type="danger">
            <img :src="loginUser.facePath" style="border-radius: 50%;width: 2em;margin: -0.5em auto"/>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-menu>
    <router-view v-on:listenLogin="changeStatus"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/home',
      search: '',
      isLogin: 'false',
      loginUser: {
        username: '',
        facePath: '',
        menuMap: {
          'home': '首页',
          'blog': '博客',
          'video': '视频',
          'about': '关于本站',
          'admin': ''
        }
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    visitorLogin () {
      this.$http.post('/ui/user/login?username=游客&password=visitor').then(response => {
        if (response && response.data) {
          if (response.data.code === '0') {
            this.isLogin = 'true'
            // // 跳转到登录成功的路径上
            localStorage.setItem('user', '游客')
            if (this.$route.query.redirect) {
              let redirect = this.$route.query.redirect
              window.location.href = redirect
            } else {
              window.location.href = response.data.data
            }
          } else {
            this.$message.error(response.data.msg)
          }
        } else {
          this.$message.error('用户名或密码输入错误')
        }
      })
    },
    logout () {
      this.$http.post('/ui/user/logout').then(response => {
        if (response && response.data && response.data.code === '0') {
          this.isLogin = 'false'
          localStorage.removeItem('user')
          window.location.href = '/home'
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loginCommand (command) {
      switch (command) {
        case 'login': {
          this.login()
          break
        }
        case 'visitor': {
          this.visitorLogin()
          break
        }
        case 'register': {
          this.$router.push('/register')
          break
        }
      }
    },
    logoutCommand (command) {
      if (command && command === 'logout') {
        this.logout()
      }
    },
    changeStatus (isIn) {
      // 传递是否已经已经登录的值
      this.isLogin = isIn
    }
  },
  mounted () {
    this.activeIndex = this.$route.path
    this.$http.get('/ui/user/get/login').then(response => {
      if (response && response.data && response.data.code === '0') {
        if (response.data.data) {
          this.isLogin = 'true'
          this.loginUser = response.data.data
          if (this.loginUser.facePath === null) {
            this.loginUser.facePath = '/upload/image/face/default.jpg'
          }
          localStorage.setItem('user', this.loginUser.username)
        } else {
          localStorage.removeItem('user')
        }
      }
    }).catch(error => {
      localStorage.removeItem('user')
      console.log(error)
    })
  }
}
</script>
