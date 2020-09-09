<template>
  <div id="admin_left">
    <el-col :span="leftCol">
      <el-menu :default-active="currentIndex"
               active-text-color="#ffd04b"
               :unique-opened="true"
               :collapse="isCollapse"
               :router="true"
               class="nav_height" :style="leftHeight">
        <el-row style="margin-bottom: 20px">
          <el-col :span="16" :offset="2">
            <span v-show="!isCollapse" style="line-height: 40px;">Hello VIP WCF</span>
          </el-col>
          <el-col :span="4" :offset="collapseOffset">
            <el-button style="height: 40px" @click="handleOpen">
              <font-awesome-icon v-show="isCollapse" icon="angle-double-right"/>
              <font-awesome-icon v-show="!isCollapse" icon="angle-double-left"/>
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="pictureOffset">
            <img :src="defaultFace" width="90%" height="100%"/>
          </el-col>
          <el-col :span="10" v-show="!isCollapse"
                  style="height: 100%;padding-top: 2em;text-align: center;">
            <span style="display:block;">WelCome</span>
            <span style="display:block;">WCF</span>
          </el-col>
        </el-row>
        <el-menu-item index="/admin/center" v-show="leftMenus.admin_center">
          <font-awesome-icon icon="desktop"/>
          <span slot="title">监控中心</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <font-awesome-icon icon="chart-bar"/>
            <span slot="title">数据中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/video" v-show="leftMenus.admin_video">视频数据中心</el-menu-item>
            <el-menu-item index="/admin/blog" v-show="leftMenus.admin_blog">博客数据中心</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <font-awesome-icon icon="edit"/>
            <span slot="title">日志中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/opsLog" v-show="leftMenus.admin_ops_log">操作记录</el-menu-item>
            <el-menu-item index="/admin/comment" v-show="leftMenus.admin_comment">评论记录</el-menu-item>
            <el-menu-item index="/admin/sysLog" v-show="leftMenus.admin_sysLog">系统日志</el-menu-item>
            <el-menu-item index="/admin/picture" v-show="leftMenus.admin_picture">图片记录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <font-awesome-icon icon="home"/>
            <span slot="title">用户中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/menu" v-show="leftMenus.admin_menu">菜单管理</el-menu-item>
            <el-menu-item index="/admin/role" v-show="leftMenus.admin_role">角色管理</el-menu-item>
            <el-menu-item index="/admin/user" v-show="leftMenus.admin_user">用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <font-awesome-icon icon="shield-alt"/>
            <span slot="title">安全管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/visitor" v-show="leftMenus.admin_visitor">访客记录</el-menu-item>
            <el-menu-item index="/admin/serverInfo" v-show="leftMenus.admin_serverInfo">服务器信息</el-menu-item>
            <el-menu-item index="/admin/tasks" v-show="leftMenus.admin_tasks">后台任务数</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  props: ['leftHeight', 'leftMenus'],
  data () {
    return {
      defaultFace: require('../../assets/face/default.jpg'),
      isCollapse: false,
      pictureOffset: 2,
      collapseOffset: 0,
      leftCol: 3,
      currentIndex: '/admin/center'
    }
  },
  methods: {
    /**
     * 左边导航栏的缩小与展开
     */
    handleOpen () {
      if (this.isCollapse) {
        this.leftCol = 3
        this.collapseOffset = 0
        this.pictureOffset = 2
        this.isCollapse = false
      } else {
        this.leftCol = 1
        this.collapseOffset = 2
        this.pictureOffset = 6
        this.isCollapse = true
      }
    }
  },
  mounted () {
    this.currentIndex = this.$route.path
  }
}
</script>

<style scoped>
</style>
