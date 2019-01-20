<template xmlns:el-col="http://www.w3.org/1999/html">
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu--horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!--style="margin-top: -8px;margin-left: -8px;margin-right: -8px"-->
      <el-col :span="1" :offset="3">
        <router-link id="logo" to="/home">
          <img src="./assets/home.jpg" style="border-radius: 50%;margin-top: 0.8em">
        </router-link>
      </el-col>
      <el-menu-item index="1" @click="home">主页</el-menu-item>
      <el-menu-item index="2" @click="blog">博客</el-menu-item>
      <el-menu-item index="3" @click="video">视频</el-menu-item>
      <el-menu-item index="4" @click="about">关于本站</el-menu-item>
      <el-menu-item index="5" @click="admin">管理中心</el-menu-item>
      <el-col :span="3" :offset="5">
        <el-input v-model="search" placeholder="请输入查询内容" style="margin-top: 0.8em"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button style="margin-left:0.3em; margin-top: 0.8em">搜索</el-button>
      </el-col>
      <el-col :span="1">
        <el-button style="margin-left: 0.3em;margin-top: 0.8em;" type="success" @click="login"
                   v-show="isLogin === 'false'">登录
        </el-button>
        <el-button style="margin-left: 0.3em;margin-top: 0.8em;" type="danger" @click="logout"
                   v-show="isLogin==='true'">退出
        </el-button>
      </el-col>
    </el-menu>
    <router-view v-on:listenLogin="changeStatus"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      search: '',
      isLogin: 'false'
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    logout () {
      this.$http.get('/logout')
      this.isLogin = 'false'
      this.$router.push('/home')
    },
    changeStatus (isIn) {
      // 传递是否已经已经登录的值
      this.isLogin = isIn
    },
    home () {
      this.$router.push('/home')
      this.activeIndex = '1'
    },
    blog () {
      this.$router.push('/blog')
      this.activeIndex = '2'
    },
    video () {
      this.$router.push('/video')
      this.activeIndex = '3'
    },
    about () {
      this.$router.push('/about')
      this.activeIndex = '4'
    },
    admin () {
      this.$router.push('/admin')
      this.activeIndex = '5'
    }
  },
  mounted () {
    this.$http.get('ui/get/login').then(response => {
      if (response && response.data && response.data.code === '0') {
        if (response.data.data) {
          this.isLogin = 'true'
        }
      }
    })
  }
}
</script>
