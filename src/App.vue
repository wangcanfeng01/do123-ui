<template xmlns:el-col="http://www.w3.org/1999/html">
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu--horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" style="margin-top: -8px;margin-left: -8px;margin-right: -8px">
      <el-col :span="1" :offset="3">
        <router-link id="logo" to="/home">
          <img src="./assets/home.jpg" style="border-radius: 50%;margin-top: 0.8em">
        </router-link>
      </el-col>
      <el-menu-item index="1">主页</el-menu-item>
      <el-menu-item index="3">博客</el-menu-item>
      <el-menu-item index="4">视频</el-menu-item>
      <el-menu-item index="2">关于本站</el-menu-item>
      <el-menu-item index="2">管理中心</el-menu-item>
      <el-col :span="3" :offset="5">
        <el-input v-model="search" placeholder="请输入查询内容" style="margin-top: 0.8em"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="margin-left:0.3em; margin-top: 0.8em">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="loginButton" :style="loginButton" type="success" @click="login" v-on:isLogin="isLogin">
          登录
        </el-button>
        <el-button class="loginButton" :style="logoutButton" type="danger" @click="login" v-on:isLogout="isLogout">
          退出
        </el-button>
      </el-col>
      <child v-bind:message="parentMsg" v-on:isLogin="isLogin"></child>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
import child from './components/home/login'

export default {
  comments: {
    child
  },
  data () {
    return {
      activeIndex: '1',
      search: '',
      loginButton: {
        marginLeft: '0.3em',
        marginTop: '0.8em',
        display: 'block'
      },
      logoutButton: {
        marginLeft: '0.3em',
        marginTop: '0.8em',
        display: 'none'
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    isLogin (display) {
      // 传递是否已经已经登录的值
      alert('sdsdasdasd')
      this.logoutButton.display = display
    },
    isLogout (display) {
      this.loginButton.display = display
    }
  }
}
</script>
