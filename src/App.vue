<template xmlns:el-col="http://www.w3.org/1999/html">
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu--horizontal" background-color="#545c64"
             text-color="#fff" :router="true" active-text-color="#ffd04b" style="min-width: 410px"
             v-loading.fullscreen.lock="loading" element-loading-text="拼命登录中，不是卡死了"
             element-loading-spinner="el-icon-loading">
      <el-col :span="1" :offset="menuOffset" style="min-width: 60px">
        <router-link id="logo" to="/home">
          <img src="./assets/home.jpg" style="border-radius: 50%;margin-top: 0.8em">
        </router-link>
      </el-col>
      <el-menu-item index="/home" v-show="loginUser.menuMap.home">主页</el-menu-item>
      <el-menu-item index="/blog/center" v-show="loginUser.menuMap.blog">博客</el-menu-item>
      <el-menu-item index="/video" v-show="loginUser.menuMap.video">视频</el-menu-item>
      <el-menu-item index="/about" v-show="loginUser.menuMap.about">关于本站</el-menu-item>
      <el-menu-item index="/admin/center" v-show="loginUser.menuMap.admin">管理中心</el-menu-item>
      <el-col :span="inputWidth" :offset="inputOffset">
        <el-input v-model="search" placeholder="请输入查询内容" style="margin-top: 0.8em;min-width: 30px"
                  :disabled="searchDisabled"></el-input>
      </el-col>
      <el-col :span="selectWidth">
        <el-button style="margin-left:0.3em; margin-top: 0.8em" @click="searchInfo" :disabled="searchDisabled">搜索
        </el-button>
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
            <img :src="loginUser.facePath" style="border-radius: 50%;width: 2em;height: 2em;margin: -0.5em auto"/>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personInfo" v-show="loginUser.username!=='游客'">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            <el-badge :value="messageCount" :max="99" class="item" :hidden="messageCount<=0">
              <el-dropdown-item command="message">留言板</el-dropdown-item>
            </el-badge>
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
      menuOffset: document.body.clientWidth > 450 ? 3 : 1,
      inputOffset: document.body.clientWidth > 450 ? 8 : 2,
      inputWidth: document.body.clientWidth > 450 ? 3 : 10,
      selectWidth: document.body.clientWidth > 450 ? 1 : 5,
      activeIndex: '/home',
      search: '',
      messageCount: 5,
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
      },
      loading: false,
      searchDisabled: false
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    visitorLogin () {
      this.loading = true
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
          window.location.href = '/login'
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
      switch (command) {
        case 'logout': {
          this.logout()
          break
        }
        case 'message': {
          this.$router.push('/leave/message')
          break
        }
        case 'personInfo': {
          let data = this.$router.resolve({path: '/personInfo', query: {'username': this.loginUser.username}})
          window.open(data.href, '_blank')
          break
        }
      }
    },
    changeStatus (isIn) {
      // 传递是否已经已经登录的值
      this.isLogin = isIn
    },
    searchInfo () {
      this.$router.push({path: '/global/search', query: {'searchKey': this.search}})
      // this.searchDisabled = false
    }
  },
  mounted () {
    // this.activeIndex = this.$route.path
    // if (this.activeIndex === '/global/search') {
    //   this.searchDisabled = true
    // } else {
    //   this.searchDisabled = false
    // }
    localStorage.removeItem('user')
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
      } else {
        localStorage.removeItem('user')
      }
    }).catch(error => {
      localStorage.removeItem('user')
      console.log(error)
    })
  }
}
</script>
<style>
  .el-loading-spinner {
    font-size: 3em;
  }

  .el-loading-spinner .el-loading-text {
    color: #409EFF;
    margin: 3px 0;
    font-size: 0.5em;
  }
</style>
